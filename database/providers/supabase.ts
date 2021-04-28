import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.TODO_SUPABASE_URL,
  process.env.TODO_SUPABASE_KEY
);
