import { supabase } from "../providers/supabase";

import { NotFoundError } from "../../utils/errors";

type Account = {
  user_id: string;
  provider_id: string;
  access_token: string;
  refresh_token: string;
  provider_account_id: string;
};

export const getAccount = async (id: string, provider: "msal") => {
  const { data, error } = await supabase
    .from<Account>("accounts")
    .select()
    .eq("user_id", id)
    .eq("provider_id", provider);

  if (error) {
    throw new Error(error.message);
  }

  if (data.length === 0) {
    throw new NotFoundError("No account found matching that user ID");
  }

  return data[0];
};

export const updateAccountTokens = async (
  id: string,
  provider: "msal",
  tokens: { accessToken: string; refreshToken: string }
) => {
  const account = await getAccount(id, provider);

  await supabase
    .from<Account>("accounts")
    .update({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    })
    .eq("provider_id", account.provider_id)
    .eq("provider_account_id", account.provider_account_id);
};
