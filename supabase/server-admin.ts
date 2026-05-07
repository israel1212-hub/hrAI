// Server-side Supabase client with service role key.
// Use ONLY in API routes / server actions — never expose to the client.
// This bypasses RLS, so only use it for trusted server-side operations.
import { createClient } from "@supabase/supabase-js";

export const createAdminClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || key === "your_service_role_key_here") {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. " +
      "Go to Supabase Dashboard → Project Settings → API → service_role key " +
      "and add it to .env.local"
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
