import { supabase } from "../providers/supabase";

import { NotFoundError } from "../../utils/errors";

type SupabaseAccount = {
  user_id: string;
  provider_id: string;
  access_token: string;
  refresh_token: string;
  provider_account_id: string;
};

type Account = {
  userId: string;
  providerId: string;
  accessToken: string;
  refreshToken: string;
  providerAccountId: string;
};

const convertSupabaseAccountToAccount = (
  supabaseAccount: SupabaseAccount
): Account => {
  return {
    userId: supabaseAccount.user_id,
    providerId: supabaseAccount.provider_id,
    accessToken: supabaseAccount.access_token,
    refreshToken: supabaseAccount.refresh_token,
    providerAccountId: supabaseAccount.provider_account_id,
  };
};

export const getAccount = async (id: string, provider: "msal") => {
  const { data, error } = await supabase
    .from<SupabaseAccount>("accounts")
    .select()
    .eq("user_id", id)
    .eq("provider_id", provider);

  if (error) {
    throw new Error(error.message);
  }

  if (data.length === 0) {
    throw new NotFoundError("No account found matching that user ID");
  }

  return convertSupabaseAccountToAccount(data[0]);
};

export const updateAccountTokens = async (
  id: string,
  provider: "msal",
  tokens: { accessToken: string; refreshToken: string }
) => {
  const account = await getAccount(id, provider);

  await supabase
    .from<SupabaseAccount>("accounts")
    .update({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    })
    .eq("provider_id", account.providerId)
    .eq("provider_account_id", account.providerAccountId);
};
