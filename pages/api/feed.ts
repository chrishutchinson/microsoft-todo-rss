import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { addFeed } from "../../utils/api/feeds";
import { createMicrosoftGraphClient } from "../../utils/api/microsoft-graph";
import { requireAuth } from "../../utils/require-auth";

const Handler: NextApiHandler = async (request, response) => {
  if (request.method !== "POST") {
    response.statusCode = 404;
    response.end();
    return;
  }

  const { user } = await getSession({ req: request });

  const { listId } = request.body;

  if (!listId) {
    response.statusCode = 400;
    response.end();
    return;
  }

  const { makeRequest } = createMicrosoftGraphClient((user as any).id);

  const list = await makeRequest<MicrosoftTodoList>(`/me/todo/lists/${listId}`);

  if (!list) {
    response.statusCode = 404;
    response.end();
    return;
  }
  console.log({ user });
  const feed = await addFeed(list.id, (user as any).id);

  if (!feed) {
    response.statusCode = 404;
    response.end();
    return;
  }

  response.json(feed);
};

export default requireAuth(Handler);
