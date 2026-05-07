import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Guard against missing env vars during build/prerender
  if (!url || !key) {
    return { auth: { signOut: async () => {}, getUser: async () => ({ data: { user: null } }) } } as any;
  }
  return createBrowserClient(url, key);
};
