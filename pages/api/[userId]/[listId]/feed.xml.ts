import { NextApiHandler } from "next";
import { createMicrosoftGraphClient } from "../../../../utils/api/microsoft-graph";
import config from "../../../../utils/config";

const Handler: NextApiHandler = async (request, response) => {
  const userId = Array.isArray(request.query.userId)
    ? request.query.userId[0]
    : request.query.userId;

  const listId = Array.isArray(request.query.listId)
    ? request.query.listId[0]
    : request.query.listId;

  const { makeRequest } = createMicrosoftGraphClient(userId);

  const list = await makeRequest<MicrosoftTodoList>(`/me/todo/lists/${listId}`);
  const { value: tasks } = await makeRequest<{ value: MicrosoftTodoTask[] }>(
    `/me/todo/lists/${listId}/tasks`
  );

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/rss+xml");

  response.send(`<?xml version="1.0" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${list.displayName}</title>
    <link>${config.baseDomain}/api/${listId}/feed.xml</link>
    <description>${
      list.displayName
    } – Microsoft To Do RSS feed generator</description>
    <atom:link href="${
      config.baseDomain
    }/api/${listId}/feed.xml" rel="self" type="application/rss+xml" />
    ${tasks
      .map((task) => {
        return `<item>
          <guid>${config.baseDomain}/api/${listId}/${task.id}</guid>
          <title>${task.title}</title>
          <link>${task.title}</link>
          <pubDate>${new Date(task.createdDateTime).toUTCString()}</pubDate>
        </item>`;
      })
      .join("\n")}
  </channel>
  </rss>`);
};

export default Handler;
