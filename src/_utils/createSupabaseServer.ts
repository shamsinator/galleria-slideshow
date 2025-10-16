import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/_utils/env";

type Cookie = {
  name: string;
  value: string;
  options: { [key: string]: any };
};

/**
 * Creates a Supabase client with server-side rendering (SSR) support.
 *
 * On the server, it uses the `cookies` API from Next.js to store and retrieve
 * cookies. This allows the Supabase client to automatically refresh user
 * sessions when the user makes a request to the server.
 *
 * @returns {SupabaseClient<Database>} A Supabase client instance with SSR support.
 */
export async function createSupabaseServer(): SupabaseClient<Database> {
  const cookieStore = await cookies();
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll(): { name: string; value: string }[] {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Cookie[]): void {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options),
        );
      },
    },
  });

  return supabase;
}
