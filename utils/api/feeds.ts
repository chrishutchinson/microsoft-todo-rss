import { dynamo } from "../dynamo-client";

export const getFeed = async (id: string, userId: string) => {
  const feed = await dynamo
    .get({
      TableName: "feeds",
      Key: {
        id,
      },
    })
    .promise();

  if (!feed || !feed.Item) {
    throw new Error("No feed found matching that feed ID");
  }

  if (feed.Item.userId !== userId) {
    throw new Error("No feed found matching that feed ID");
  }

  return feed.Item;
};

export const addFeed = async (id: string, userId: string) => {
  try {
    const existingFeed = await getFeed(id, userId);

    return existingFeed;
  } catch (e) {
    const feed = await dynamo
      .put({
        TableName: "feeds",
        Item: {
          id,
          userId,
        },
      })
      .promise();

    if (!feed) {
      throw new Error("Unable to add feed");
    }
  }
};

export const deleteFeed = async (id: string, userId: string) => {
  const existingFeed = await getFeed(id, userId);

  await dynamo
    .delete({
      TableName: "feeds",
      Key: {
        id: existingFeed.id,
      },
    })
    .promise();
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
