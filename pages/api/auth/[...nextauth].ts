import NextAuth from "next-auth";
import NextAuthDynamodb from "next-auth-dynamodb";

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
    console.log(profile);
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

export default NextAuth({
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
  adapter: NextAuthDynamodb,
});
