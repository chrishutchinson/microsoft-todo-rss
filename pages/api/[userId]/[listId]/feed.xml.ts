import { NextApiHandler } from "next";
import ogs from "open-graph-scraper";

import { getFeed } from "../../../../database/models/feeds";
import { createMicrosoftGraphClient } from "../../../../utils/api/microsoft-graph";
import { buildFeedUrl } from "../../../../utils/build-feed-url";
import config from "../../../../utils/config";
import { convertErrorToStatusCode } from "../../../../utils/errors";

const convertTaskToRssItem = async (
  task: MicrosoftTodoTask
): Promise<string | null> => {
  try {
    const { error, result } = await ogs({
      url: task.title,
    });

    if (error) {
      return null;
    }

    return `<item>
      <guid>${config.baseDomain}/api/task/${task.id}</guid>
      <title>${(result as any).ogTitle}</title>
      <link>${(result as any).ogUrl || (result as any).requestUrl}</link>
      <pubDate>${new Date(task.createdDateTime).toUTCString()}</pubDate>
    </item>`;
  } catch (e) {
    return `<item>
      <guid>${config.baseDomain}/api/task/${task.id}</guid>
      <title>Unable to parse To Do with ID ${task.id}</title>
      <link>${config.baseDomain}/api/task/${task.id}</link>
      <pubDate>${new Date(task.createdDateTime).toUTCString()}</pubDate>
    </item>`;
  }
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

    const taskItems = (
      await Promise.all(
        tasks
          .filter((t) => !t.completedDateTime)
          .map((task) => {
            return convertTaskToRssItem(task);
          })
      )
    ).filter(Boolean);

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/rss+xml");

    response.send(`<?xml version="1.0" ?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${list.displayName} (via ${config.appTitle})</title>
        <link>${buildFeedUrl(
          {
            id: listId,
            userId,
          },
          { relative: false }
        )}</link>
        <description>${
          list.displayName
        } – Microsoft To Do RSS feed generator</description>
        <atom:link href="${buildFeedUrl(
          {
            id: listId,
            userId,
          },
          { relative: false }
        )}" rel="self" type="application/rss+xml" />
        ${taskItems.join("\n")}
      </channel>
      </rss>`);
  } catch (e) {
    response.statusCode = convertErrorToStatusCode(e);
    response.end();
  }
};

export default Handler;
