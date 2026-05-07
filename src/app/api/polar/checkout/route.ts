import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hr-ai-delta.vercel.app";

  if (!accessToken || accessToken === "your_polar_access_token_here") {
    return NextResponse.json({ error: "Polar is not configured" }, { status: 503 });
  }

  try {
    const { Checkout } = await import("@polar-sh/nextjs");
    const handler = Checkout({
      accessToken,
      successUrl: `${appUrl}/payment/success`,
      server: "production",
    });
    return handler(request);
  } catch (err: any) {
    console.error("[polar/checkout] Error:", err.message);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
