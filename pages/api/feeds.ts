import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { getFeeds } from "../../api/feeds";
import { requireAuth } from "../../utils/require-auth";

const Handler: NextApiHandler = async (request, response) => {
  const { user } = await getSession({ req: request });

  const feeds = await getFeeds(user.id);

  response.json(feeds);
};

export default requireAuth(Handler);
