import { supabase } from "../providers/supabase";

import { NotFoundError } from "../../utils/errors";

type SupabaseFeed = {
  id: string;
  list_id: string;
  user_id: number;
};

export type Feed = {
  id: string;
  listId: string;
  userId: string;
};

const convertSupabaseFeedToFeed = (supabaseFeed: SupabaseFeed): Feed => {
  return {
    id: supabaseFeed.id,
    listId: supabaseFeed.list_id,
    userId: supabaseFeed.user_id.toString(),
  };
};

export const getFeed = async (listId: string, userId: string) => {
  const { data, error } = await supabase
    .from<SupabaseFeed>("feeds")
    .select()
    .eq("list_id", listId)
    .eq("user_id", userId);

  if (error || !data || data.length === 0) {
    throw new NotFoundError("No feed found matching that feed ID");
  }

  const feed = convertSupabaseFeedToFeed(data[0]);

  if (feed.userId !== userId) {
    throw new NotFoundError("No feed found matching that feed ID");
  }

  return feed;
};

export const addFeed = async (listId: string, userId: string) => {
  try {
    const existingFeed = await getFeed(listId, userId);

    return existingFeed;
  } catch (e) {
    if (e instanceof NotFoundError) {
      const { data, error } = await supabase
        .from<SupabaseFeed>("feeds")
        .insert({
          list_id: listId,
          user_id: parseInt(userId),
        });

      if (error) {
        throw new Error(error.message);
      }

      return convertSupabaseFeedToFeed(data[0]);
    }

    throw e;
  }
};

export const deleteFeed = async (listId: string, userId: string) => {
  const existingFeed = await getFeed(listId, userId);

  await supabase
    .from<SupabaseFeed>("feeds")
    .delete()
    .eq("list_id", existingFeed.listId);
};

export const getFeeds = async (userId: string) => {
  const { data, error } = await supabase
    .from<SupabaseFeed>("feeds")
    .select()
    .eq("user_id", userId.toString());

  if (error) {
    throw new Error(error.message);
  }

  return data.map((f) => convertSupabaseFeedToFeed(f));
};
