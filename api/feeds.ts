import { DynamoDB } from "aws-sdk";

export const getFeed = async (id: string) => {
  const dynamo = new DynamoDB.DocumentClient();

  const feed = await dynamo
    .get({
      TableName: "feeds",
      Key: {
        id,
      },
    })
    .promise();

  if (!feed) {
    throw new Error("No feed found matching that feed ID");
  }

  return feed.Item;
};

export const getFeeds = async (userId: string) => {
  const dynamo = new DynamoDB.DocumentClient();

  const feeds = await dynamo
    .query({
      TableName: "feeds",
      IndexName: "UserFeedsIndex",
      KeyConditionExpression: "#userId = :userId",
      ExpressionAttributeNames: {
        "#userId": "userId",
      },
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    })
    .promise();

  return feeds.Items;
};
