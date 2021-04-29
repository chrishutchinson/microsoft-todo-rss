import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { addFeed, deleteFeed } from "../../database/models/feeds";
import { createMicrosoftGraphClient } from "../../utils/api/microsoft-graph";
import { requireAuth } from "../../utils/require-auth";

const Handler: NextApiHandler = async (request, response) => {
  if (!["POST", "DELETE"].includes(request.method || "")) {
    response.statusCode = 404;
    response.end();
    return;
  }

  const { user = null } = await getSession({ req: request });

  const { listId } = request.method === "POST" ? request.body : request.query;

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

  if (request.method === "POST") {
    await addFeed(list.id, (user as any).id);

    response.json({
      listId: list.id,
      userId: (user as any).id,
    });
    return;
  }

  if (request.method === "DELETE") {
    await deleteFeed(list.id, (user as any).id);

    response.statusCode = 204;
    response.end();
    return;
  }

  response.statusCode = 404;
  response.end();
};

export default requireAuth(Handler);
