import { dynamo } from "../dynamo-client";

export const getFeed = async (id: string) => {
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
