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

const userIdPresent = false;
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
const SOLVE_REGEX = `${SOLVE_SYMBOL}\\(([0-9+\\-_*\\/%^\\s,\\.()]+)\\)`

const processExercises = (exercises) => {
    const parsed = []

    exercises.forEach(exercise => {
        try {
            parsed.push(processExercise(exercise))
        } catch (e) {
            console.log(`could not process exercise ${exercise.name}`, e)
        }
    })

    parsed.sort((a, b) => (a.difficulty < b.difficulty) ? -1 : 1)

    return parsed
}

const processExercise = (exercise) => {
    let variables = resolveVariables(exercise.variables)

    return {
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
}

const resolveVariables = (variables) => {
    let resolved = {}
    variables.forEach(variable => {
        const min = Math.ceil(variable.rangeStart)
        const max = Math.floor(variable.rangeEnd)
        resolved[variable.name] = Math.floor(Math.random() * (max - min + 1) + min)
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
        contents = removeExtraBrackets(contents)
        try {
            return evaluate(contents)
        } catch (e) {
            console.log(`could not parse ${contents}`, e)
            throw e
        }
    })

    return applyMathPostProcesses(result)
}

const MATH_EXPRESSION_REGEX = '(\\$)([^$]+)(\\$)'
const applyMathPostProcesses = (content) => {
    const regex = new RegExp(MATH_EXPRESSION_REGEX, 'gm')
    return content.replace(regex, (match, openingSymbol, mathContent, closingSymbol) => {
        mathContent = simplifyFractions(mathContent)
        mathContent = removeUnitExp(mathContent)
        mathContent = removeConflictingOperators(mathContent)
        return `${openingSymbol}${mathContent}${closingSymbol}`
    })
}

const removeConflictingOperators = (content) => {
    content = content.replace(/\+-/g, '-')
    return content.replace(/--/g, '+')
}

const UNIT_EXP_REGEX = '\\^1|\\^{[1]}'
const removeUnitExp = (content) => {
    const regex = new RegExp(UNIT_EXP_REGEX, 'gm')
    return content.replace(regex, '')
}

const SIMPL_FRAC_REGEX = '\\\\frac\\s*{\\s*(-?\\d+)\\s*}\\s*{\\s*(-?\\d+)\\s*}'
const simplifyFractions = (content) => {
    const regex = new RegExp(SIMPL_FRAC_REGEX, 'gm')
    return content.replace(regex, (match, numerator, denominator) => {
        const gcd = greaterCommonDenominator(Math.abs(numerator), Math.abs(denominator))
        numerator /= gcd
        denominator /= gcd
        if (numerator < 0 && denominator < 0) {
            numerator *= -1
            denominator *= -1
        }
        return denominator > 1 ? `\\frac{${numerator}}{${denominator}}` : numerator
    })
}

const greaterCommonDenominator = (a, b) => {
    return b ? greaterCommonDenominator(b, a % b) : a
}

const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

const removeExtraBrackets = (contents) => {
    let bracketCount = 0
    for (let i = 0; i < contents.length; i++) {
        if (contents[i] === '(') {
            bracketCount++
        } else if (contents[i] === ')') {
            bracketCount--
        }
    }

    while (bracketCount < 0) {
        let lastIndex = contents.lastIndexOf(')')
        contents = contents.slice(0, lastIndex) + contents.slice(lastIndex + 1)
        bracketCount++
    }

    return contents
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
            res.json(processExercises(data.Items));
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
