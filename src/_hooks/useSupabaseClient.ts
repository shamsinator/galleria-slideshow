import { useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/_utils/database.types";
import { getSupabaseConfig } from "@/_utils/env";

export type TypedSupabaseClient = SupabaseClient<Database>;
let client: TypedSupabaseClient | undefined;

/**
 * Creates and returns a new instance of Supabase client with browser support.
 *
 * If the instance is already created, it returns the existing one.
 *
 * @returns {SupabaseClient<Database>} A Supabase client instance with browser support.
 */
export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  if (client) {
    return client;
  }

  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  client = createBrowserClient<Database>(supabaseUrl, supabaseKey);

  return client;
}

function useSupabaseClient() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabaseClient;
