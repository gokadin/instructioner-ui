/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
const {randomUUID} = require("crypto");
const {evaluate} = require("mathjs");

AWS.config.update({region: process.env.TABLE_REGION});

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "exercises";
if (process.env.ENV && process.env.ENV !== "NONE") {
    tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "subtopicId";
const partitionKeyType = "S";
const sortKeyName = "id";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/exercises";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
    switch (type) {
        case "N":
            return Number.parseInt(param);
        default:
            return param;
    }
}

const VARIABLE_SYMBOL = '@var'
const VARIABLE_REGEX = `${VARIABLE_SYMBOL}\\((\\w+)\\)`

const SOLVE_SYMBOL = '@solve'
const SOLVE_REGEX = `${SOLVE_SYMBOL}\\(([0-9+\\-_*\\/%^\\s,a-zA-Z]+)\\)`

const processExercise = (exercise) => {
    let variables = resolveVariables(exercise.variables)

    const parsed = {
        ...exercise,
        question: parseContent(exercise.question, variables),
        answerFields: shuffleArray(exercise.answerFields.map(answerField => {
            return {
                ...answerField,
                content: parseContent(answerField.content, variables)
            }
        })),
        hints: exercise.hints.map(hint => {
            return {
                ...hint,
                content: parseContent(hint.content, variables)
            }
        })
    }

    return parsed.sort((a, b) => (a.difficulty < b.difficulty) ? 1 : -1)
}

const resolveVariables = (variables) => {
    let resolved = {}
    variables.forEach(variable => {
        resolved[variable.name] = variable.default.toString()
    })
    return resolved
}

const parseContent = (content, variables) => {
    const variableRegex = new RegExp(VARIABLE_REGEX, 'gm')
    let result = content.replace(variableRegex, (match, contents) => {
        return variables[contents]
    })

    const solveRegex = new RegExp(SOLVE_REGEX, 'gm')
    result = result.replace(solveRegex, (match, contents) => {
        return evaluate(contents)
    })

    return result
}

const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path + hashKeyPath, function (req, res) {
    var condition = {}
    condition[partitionKeyName] = {
        ComparisonOperator: 'EQ'
    }

    if (userIdPresent && req.apiGateway) {
        condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
    } else {
        try {
            condition[partitionKeyName]['AttributeValueList'] = [convertUrlType(req.params[partitionKeyName], partitionKeyType)];
        } catch (err) {
            res.statusCode = 500;
            res.json({error: 'Wrong column type ' + err});
        }
    }

    let queryParams = {
        TableName: tableName,
        KeyConditions: condition
    }

    dynamodb.query(queryParams, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.json({error: 'Could not load items: ' + err});
        } else {
            res.json(data.Items.map(processExercise));
        }
    });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
    var params = {};
    if (userIdPresent && req.apiGateway) {
        params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    } else {
        params[partitionKeyName] = req.params[partitionKeyName];
        try {
            params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
        } catch (err) {
            res.statusCode = 500;
            res.json({error: 'Wrong column type ' + err});
        }
    }
    if (hasSortKey) {
        try {
            params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
        } catch (err) {
            res.statusCode = 500;
            res.json({error: 'Wrong column type ' + err});
        }
    }

    let getItemParams = {
        TableName: tableName,
        Key: params
    }

    dynamodb.get(getItemParams, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.json({error: 'Could not load items: ' + err.message});
        } else {
            if (data.Item) {
                res.json(data.Item);
            } else {
                res.json(data);
            }
        }
    });
});


/************************************
 * HTTP put method for insert object *
 *************************************/

app.put(path, function (req, res) {

    if (userIdPresent) {
        req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    }

    let putItemParams = {
        TableName: tableName,
        Item: req.body
    }
    dynamodb.put(putItemParams, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.json({error: err, url: req.url, body: req.body});
        } else {
            res.json({success: 'put call succeed!', url: req.url, data: data})
        }
    });
});

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post(path, function (req, res) {

    if (userIdPresent) {
        req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    }

    let putItemParams = {
        TableName: tableName,
        Item: {
            ...req.body,
            id: randomUUID()
        }
    }
    dynamodb.put(putItemParams, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.json({error: err, url: req.url, body: req.body});
        } else {
            res.json({success: 'post call succeed!', url: req.url, data: data})
        }
    });
});

/**************************************
 * HTTP remove method to delete object *
 ***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, function (req, res) {
    var params = {};
    if (userIdPresent && req.apiGateway) {
        params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    } else {
        params[partitionKeyName] = req.params[partitionKeyName];
        try {
            params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
        } catch (err) {
            res.statusCode = 500;
            res.json({error: 'Wrong column type ' + err});
        }
    }
    if (hasSortKey) {
        try {
            params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
        } catch (err) {
            res.statusCode = 500;
            res.json({error: 'Wrong column type ' + err});
        }
    }

    let removeItemParams = {
        TableName: tableName,
        Key: params
    }
    dynamodb.delete(removeItemParams, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.json({error: err, url: req.url});
        } else {
            res.json({url: req.url, data: data});
        }
    });
});
app.listen(3000, function () {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
