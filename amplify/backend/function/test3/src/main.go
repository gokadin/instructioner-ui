package main

import (
  "context"
  "github.com/aws/aws-lambda-go/lambda"
)

type MyEvent struct {
  Name string `json:"name"`
}

type Response struct {
  StatusCode int               `json:"statusCode"`
  Headers    map[string]string `json:"headers"`
  Body       string            `json:"body"`
}

func HandleRequest(ctx context.Context, name MyEvent) (Response, error) {
  return Response{
    StatusCode: 200,
    Headers:    map[string]string{"Content-Type": "application/json"},
    Body:       "coming from backend!!",
  }, nil
}

func main() {
  lambda.Start(HandleRequest)
}
