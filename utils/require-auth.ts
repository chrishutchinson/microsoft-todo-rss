import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

export const requireAuth = (handler: NextApiHandler): NextApiHandler => async (
  request,
  response
) => {
  const session = await getSession({ req: request });

  if (!session) {
    response.statusCode = 401;
    response.end();
    return;
  }

  return handler(request, response);
};
