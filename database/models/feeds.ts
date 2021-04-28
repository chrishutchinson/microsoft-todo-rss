import { supabase } from "../providers/supabase";

import { NotFoundError } from "../../utils/errors";

type SupabaseFeed = {
  id: string;
  user_id: string;
};

type Feed = {
  id: string;
  userId: string;
};

const convertSupabaseFeedToFeed = (supabaseFeed: SupabaseFeed): Feed => {
  return {
    id: supabaseFeed.id,
    userId: supabaseFeed.user_id,
  };
};

export const getFeed = async (id: string, userId: string) => {
  const { data, error } = await supabase
    .from<SupabaseFeed>("feeds")
    .select()
    .eq("id", id);

  if (error || data.length === 0) {
    throw new NotFoundError("No feed found matching that feed ID");
  }

  const feed = convertSupabaseFeedToFeed(data[0]);

  if (feed.userId !== userId) {
    throw new NotFoundError("No feed found matching that feed ID");
  }

  return feed;
};

export const addFeed = async (id: string, userId: string) => {
  try {
    const existingFeed = await getFeed(id, userId);

    return existingFeed;
  } catch (e) {
    const { data, error } = await supabase.from<SupabaseFeed>("feeds").insert({
      id,
      user_id: userId,
    });

    if (error) {
      throw new Error(error.message);
    }

    return convertSupabaseFeedToFeed(data[0]);
  }
};

export const deleteFeed = async (id: string, userId: string) => {
  const existingFeed = await getFeed(id, userId);

  await supabase.from<SupabaseFeed>("feeds").delete().eq("id", existingFeed.id);
};

export const getFeeds = async (userId: string) => {
  const { data, error } = await supabase
    .from<SupabaseFeed>("feeds")
    .select()
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((f) => convertSupabaseFeedToFeed(f));
};
