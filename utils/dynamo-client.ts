import { DynamoDB } from "aws-sdk";

export const dynamo = new DynamoDB.DocumentClient({
  credentials: {
    accessKeyId: process.env.TODO_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.TODO_AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.TODO_AWS_DEFAULT_REGION,
});
