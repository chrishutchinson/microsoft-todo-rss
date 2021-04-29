import config from "./config";
import { Feed } from "../database/models/feeds";

export const buildFeedUrl = (
  feed: Pick<Feed, "listId" | "userId">,
  options?: {
    relative?: boolean;
  }
) => {
  return `${options?.relative ? "" : config.baseDomain}/api/${feed.userId}/${
    feed.listId
  }/feed.xml`;
};
