import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

const MicrosoftProvider = ({
  clientId,
  clientSecret,
  accessTokenUrl,
  authorizationUrl,
  requestTokenUrl,
}: {
  clientId: string;
  clientSecret: string;
  accessTokenUrl: string;
  requestTokenUrl: string;
  authorizationUrl: string;
}) => ({
  id: "msal",
  name: "Microsoft Login",
  type: "oauth",
  version: "2.0",
  scope: process.env.MSAL_SCOPES,
  params: { grant_type: "authorization_code" },
  accessTokenUrl,
  requestTokenUrl,
  authorizationUrl,
  profileUrl: "https://graph.microsoft.com/v1.0/me/",
  profile: (profile) => {
    return {
      id: profile.id,
      name: profile.displayName,
      last_name: profile.surname,
      first_name: profile.givenName,
      email: profile.userPrincipalName,
    };
  },
  clientId,
  clientSecret,
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  process.env.NEXTAUTH_URL =
    process.env.NEXTAUTH_URL || `${protocol}://${process.env.VERCEL_URL}`;

  return NextAuth(req, res, {
    jwt: {
      signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
      session: async (session, token) => {
        return {
          ...session,
          user: {
            ...session.user,
            id: (token as any).sub,
          },
        };
      },
    },
    session: {
      jwt: true,
    },
    providers: [
      MicrosoftProvider({
        clientId: process.env.MSAL_CLIENT_ID,
        clientSecret: process.env.MSAL_CLIENT_SECRET,
        accessTokenUrl: process.env.MSAL_ACCESS_URL,
        authorizationUrl: process.env.MSAL_AUTHORIZATION_URL,
        requestTokenUrl: process.env.MSAL_REQUEST_URL,
      }),
    ],
    database: `postgres://${process.env.SUPABASE_DATABASE_USERNAME}:${process.env.SUPABASE_DATABASE_PASSWORD}@${process.env.SUPABASE_DATABASE_HOST}:5432/${process.env.SUPABASE_DATABASE_NAME}`,
  });
};
