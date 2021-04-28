import { Client } from "@microsoft/microsoft-graph-client";

import {
  getAccount,
  updateAccountTokens,
} from "../../database/models/accounts";

export const createMicrosoftGraphClient = (userId?: string) => {
  if (!userId) {
    throw new Error("Please initialise the client with a user ID");
  }

  const getTokensForUser = async () => {
    const { accessToken, refreshToken } = await getAccount(userId, "msal");

    return {
      accessToken,
      refreshToken,
    };
  };

  const updateStoredTokensForUser = async (accessToken, refreshToken) => {
    await updateAccountTokens(userId, "msal", {
      accessToken,
      refreshToken,
    });
  };

  const getRefreshedTokens = async (refreshToken) => {
    const response = await fetch(process.env.MSAL_ACCESS_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.MSAL_CLIENT_ID,
        client_secret: process.env.MSAL_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        scope: process.env.MSAL_SCOPES,
      }),
    }).then((res) => res.json());

    const { access_token, refresh_token } = response;

    await updateStoredTokensForUser(access_token, refresh_token);

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  };

  const makeRequest = async <T>(path: string): Promise<T> => {
    const request = (accessToken: string) => {
      const client = Client.initWithMiddleware({
        authProvider: {
          getAccessToken: async () => {
            return accessToken;
          },
        },
      });

      return client.api(path).get() as Promise<T>;
    };

    const { accessToken, refreshToken } = await getTokensForUser();

    try {
      const result = await request(accessToken);

      return result;
    } catch (e) {
      const { accessToken } = await getRefreshedTokens(refreshToken);

      return request(accessToken);
    }
  };

  return {
    makeRequest,
  };
};
