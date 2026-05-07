import { NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";
import { createAdminClient } from "../../../../../supabase/server-admin";

export async function GET() {
  try {
    // 1. Verify the user session (anon client reads cookies)
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user || error) {
      console.error("[wallet/balance] getUser failed:", error?.message ?? "no user");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Use admin client for DB reads (bypasses RLS issues)
    const admin = createAdminClient();

    const { data: wallet, error: walletError } = await admin
      .from("wallets")
      .select("balance, currency, is_frozen, updated_at")
      .eq("user_id", user.id)
      .single();

    if (walletError || !wallet) {
      // Auto-create wallet if missing
      const { data: newWallet } = await admin
        .from("wallets")
        .insert({ user_id: user.id, balance: 0, currency: "RWF" })
        .select()
        .single();
      return NextResponse.json({ balance: 0, currency: "RWF", is_frozen: false, wallet: newWallet });
    }

    return NextResponse.json(wallet);
  } catch (err: any) {
    console.error("[wallet/balance] Error:", err.message);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
