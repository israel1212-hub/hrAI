import { NextRequest, NextResponse } from "next/server";

// Switch between sandbox and production via NEXT_PUBLIC_POLAR_MODE env var
// sandbox = fake payments (test cards work, no real money)
// production = real payments

const isSandbox = process.env.NEXT_PUBLIC_POLAR_MODE === "sandbox";

const accessToken = isSandbox
  ? process.env.POLAR_SANDBOX_ACCESS_TOKEN
  : process.env.POLAR_ACCESS_TOKEN;

export async function GET(request: NextRequest) {
  // Use request origin so it works on any domain (production, preview, local)
  const origin = request.headers.get("origin") ||
    request.headers.get("referer")?.split("/").slice(0, 3).join("/") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://hr-ai-delta.vercel.app";

  if (!accessToken) {
    return NextResponse.json({ error: "Polar is not configured" }, { status: 503 });
  }

  try {
    const { Checkout } = await import("@polar-sh/nextjs");
    const handler = Checkout({
      accessToken,
      successUrl: `${origin}/payment/success`,
      server: isSandbox ? "sandbox" : "production",
    });
    return handler(request);
  } catch (err: any) {
    console.error("[polar/checkout] Error:", err.message);
    return NextResponse.json({ error: err.message || "Checkout failed" }, { status: 500 });
  }
}
