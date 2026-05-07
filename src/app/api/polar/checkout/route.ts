import { NextRequest, NextResponse } from "next/server";

const isSandbox = process.env.NEXT_PUBLIC_POLAR_MODE === "sandbox";

const accessToken = isSandbox
  ? process.env.POLAR_SANDBOX_ACCESS_TOKEN
  : process.env.POLAR_ACCESS_TOKEN;

export async function GET(request: NextRequest) {
  if (!accessToken) {
    return NextResponse.json({ error: "Polar is not configured" }, { status: 503 });
  }

  // Build success URL from the incoming request host — works on any domain
  const host = request.headers.get("host") || "hr-ai-delta.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const successUrl = `${protocol}://${host}/payment/success`;

  try {
    const { Checkout } = await import("@polar-sh/nextjs");
    const handler = Checkout({
      accessToken,
      successUrl,
      server: isSandbox ? "sandbox" : "production",
    });
    return handler(request);
  } catch (err: any) {
    console.error("[polar/checkout] Error:", err.message);
    return NextResponse.json({ error: err.message || "Checkout failed" }, { status: 500 });
  }
}
