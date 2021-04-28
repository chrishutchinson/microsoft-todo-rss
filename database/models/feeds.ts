import { supabase } from "../providers/supabase";

import { NotFoundError } from "../../utils/errors";

type Feed = {
  id: string;
  user_id: string;
};

export const getFeed = async (id: string, userId: string) => {
  const { data, error } = await supabase
    .from<Feed>("feeds")
    .select()
    .eq("id", id);

  if (error || data.length === 0) {
    throw new NotFoundError("No feed found matching that feed ID");
  }

  const feed = data[0];

  if (feed.user_id !== userId) {
    throw new NotFoundError("No feed found matching that feed ID");
  }

  return feed;
};

export const addFeed = async (id: string, userId: string) => {
  try {
    const existingFeed = await getFeed(id, userId);

    return existingFeed;
  } catch (e) {
    const { error } = await supabase.from<Feed>("feeds").insert({
      id,
      user_id: userId,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
};

export const deleteFeed = async (id: string, userId: string) => {
  const existingFeed = await getFeed(id, userId);

  await supabase.from<Feed>("feeds").delete().eq("id", existingFeed.id);
};

export const getFeeds = async (userId: string) => {
  const { data, error } = await supabase
    .from<Feed>("feeds")
    .select()
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
