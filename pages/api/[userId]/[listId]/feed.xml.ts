import { NextApiHandler } from "next";
import ogs from "open-graph-scraper";

import { getFeed } from "../../../../utils/api/feeds";
import { createMicrosoftGraphClient } from "../../../../utils/api/microsoft-graph";
import config from "../../../../utils/config";

const convertTaskToRssItem = async (
  task: MicrosoftTodoTask,
  listId: string
): Promise<string | null> => {
  const { error, result } = await ogs({
    url: task.title,
  });

  if (error) {
    return null;
  }

  return `<item>
    <guid>${config.baseDomain}/api/${listId}/${task.id}</guid>
    <title>${(result as any).ogTitle}</title>
    <link>${(result as any).ogUrl}</link>
    <pubDate>${new Date(task.createdDateTime).toUTCString()}</pubDate>
  </item>`;
};

const Handler: NextApiHandler = async (request, response) => {
  try {
    const userId = Array.isArray(request.query.userId)
      ? request.query.userId[0]
      : request.query.userId;

    const listId = Array.isArray(request.query.listId)
      ? request.query.listId[0]
      : request.query.listId;

    const feed = await getFeed(listId, userId);

    const { makeRequest } = createMicrosoftGraphClient(userId);

    const list = await makeRequest<MicrosoftTodoList>(
      `/me/todo/lists/${feed.id}`
    );
    const { value: tasks } = await makeRequest<{ value: MicrosoftTodoTask[] }>(
      `/me/todo/lists/${feed.id}/tasks`
    );

    const taskItems = await Promise.all(
      tasks.map((task) => {
        return convertTaskToRssItem(task, listId);
      })
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
        ${taskItems.join("\n")}
      </channel>
      </rss>`);
  } catch (e) {
    response.statusCode = 404;
    response.end();
  }
};

export default Handler;
