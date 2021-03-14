import config from "./config";

export const buildFeedUrl = (
  feed: { id: string; userId: string },
  options?: {
    relative?: boolean;
  }
) => {
  return `${options?.relative ? "" : config.baseDomain}/api/${feed.userId}/${
    feed.id
  }/feed.xml`;
};
