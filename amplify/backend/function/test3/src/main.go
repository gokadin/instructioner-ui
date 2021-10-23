package main

import (
  "context"
  "github.com/aws/aws-lambda-go/lambda"
)

func HandleRequest(ctx context.Context) (Response, error) {
  return RespondOk(map[string]interface{}{
    "message": "Coming from backend!",
  })
}

func main() {
  lambda.Start(HandleRequest)
}
