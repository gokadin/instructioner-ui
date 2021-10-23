package main

import (
	"bytes"
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
)

type Response events.APIGatewayProxyResponse

func RespondOk(data interface{}) (Response, error) {
	return respond(200, data)
}

func RespondInternalServerError(data interface{}) (Response, error) {
	return respond(500, data)
}

func RespondNotFound(data interface{}) (Response, error) {
	return respond(404, data)
}

func respond(statusCode int, data interface{}) (Response, error) {
	var buf bytes.Buffer

	body, err := json.Marshal(data)
	if err != nil {
		return Response{StatusCode: 500}, err
	}
	json.HTMLEscape(&buf, body)

	return Response{
		StatusCode:      200,
		IsBase64Encoded: false,
		Body:            buf.String(),
		Headers: map[string]string{
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
			"Access-Control-Allow-Headers": "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization",
		},
	}, nil
}
