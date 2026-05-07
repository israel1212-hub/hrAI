import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If env vars missing, just pass through — don't crash
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.next({ request: { headers: request.headers } });
    }

    let response = NextResponse.next({ request: { headers: request.headers } });

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll().map(({ name, value }) => ({ name, value }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({ request: { headers: request.headers } });
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data: { user }, error } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;
    const protectedRoutes = ["/dashboard", "/wallet", "/payment"];
    const isProtectedPage = protectedRoutes.some((r) => pathname.startsWith(r));

    if (isProtectedPage && (error || !user)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (!error && user &&
      (pathname.startsWith("/sign-in") ||
       pathname.startsWith("/sign-up") ||
       pathname.startsWith("/forgot-password"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  } catch {
    // Never crash on middleware errors — just pass through
    return NextResponse.next({ request: { headers: request.headers } });
  }
};
