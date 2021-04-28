# To Do × RSS

> Create RSS feeds from your [Microsoft To Do](https://todo.microsoft.com/) lists

## Getting Started

1. Install the dependencies:

```bash
yarn
```

2. Copy `.env.example` to `.env.local` and complete.

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

| Variable                        | Description                                                                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| NEXT_PUBLIC_APP_URL             | The base URL of your app with scheme, e.g. http://localhost:3000                                                                          |
| NEXTAUTH_URL                    | The base URL of your app with scheme, e.g. http://localhost:3000                                                                          |
| TODO_JWT_SIGNING_PRIVATE_KEY    | JWT signing key, see [here](https://next-auth.js.org/warnings#jwt_auto_generated_signing_key) for docs on how to generate this            |
| TODO_SUPABASE_DATABASE_HOST     | Supabase database hostname                                                                                                                |
| TODO_SUPABASE_DATABASE_NAME     | Supabase database name                                                                                                                    |
| TODO_SUPABASE_DATABASE_USERNAME | Supabase database username                                                                                                                |
| TODO_SUPABASE_DATABASE_PASSWORD | Supabase database password                                                                                                                |
| TODO_SUPABASE_URL               | Supabase URL                                                                                                                              |
| TODO_SUPABASE_KEY               | Supabase auth key                                                                                                                         |
| MSAL_CLIENT_ID                  | Client ID from the Microsoft Azure app portal                                                                                             |
| MSAL_CLIENT_SECRET              | Client secret from the Microsoft Azure app portal                                                                                         |
| MSAL_ACCESS_URL                 | Access token URL for MSAL                                                                                                                 |
| MSAL_AUTHORIZATION_URL          | Authorization URL for MSAL                                                                                                                |
| MSAL_REQUEST_URL                | Request token URL for MSAL                                                                                                                |
| MSAL_SCOPES                     | Scopes to request from Microsoft, should be `offline_access https://graph.microsoft.com/user.read https://graph.microsoft.com/tasks.read` |

## Deployment

The app is automatically deployed to Vercel preview environments when a PR is opened, and to Vercel production when they are merged into the `main` branch.

## About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
