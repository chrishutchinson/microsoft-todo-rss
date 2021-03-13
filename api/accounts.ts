import { dynamo } from "../utils/dynamo-client";

export const getAccount = async (id: string, provider: "msal") => {
  const account = await dynamo
    .query({
      TableName: "accounts",
      IndexName: "AccountUserProviderIndex",
      KeyConditionExpression: "userId = :userId and providerId = :providerId",
      ExpressionAttributeValues: {
        ":userId": id,
        ":providerId": provider,
      },
    })
    .promise();

  if (!account || account.Items.length === 0) {
    throw new Error("No account found matching that user ID");
  }

  return account.Items[0];
};

export const updateAccountTokens = async (
  id: string,
  provider: "msal",
  tokens: { accessToken: string; refreshToken: string }
) => {
  const account = await getAccount(id, provider);

  await dynamo.update({
    TableName: "accounts",
    Key: {
      providerId: account.providerId,
      providerAccountId: account.providerAccountId,
    },
    AttributeUpdates: {
      accessToken: {
        Value: tokens.accessToken,
      },
      refreshToken: {
        Value: tokens.refreshToken,
      },
    },
  });
};
