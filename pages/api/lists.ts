import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";

import { createMicrosoftGraphClient } from "../../api/microsoft-graph";
import { requireAuth } from "../../utils/require-auth";

const Handler: NextApiHandler = async (request, response) => {
  const { user } = await getSession({ req: request });
  const { makeRequest } = createMicrosoftGraphClient((user as any).id);

  const { value: lists } = await makeRequest<{ value: MicrosoftTodoList[] }>(
    `/me/todo/lists`
  );

  response.statusCode = 200;
  response.json(lists);
};

export default requireAuth(Handler);
