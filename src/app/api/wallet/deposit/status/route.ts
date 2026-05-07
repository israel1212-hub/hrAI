import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../../../supabase/server";
import { createAdminClient } from "../../../../../../supabase/server-admin";
import { paypackGetTransaction } from "@/lib/paypack";

// GET /api/wallet/deposit/status?ref=PAYPACK_REF&txRef=OUR_REF
// Called by frontend every 3s to check if user approved the USSD prompt.
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user || error) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const ref   = searchParams.get("ref");
    const txRef = searchParams.get("txRef");

    if (!ref) return NextResponse.json({ error: "ref is required" }, { status: 400 });

    // Check status with Paypack
    const tx = await paypackGetTransaction(ref);

    const admin = createAdminClient();

    if (tx.status === "successful") {
      // Credit wallet
      const { data: wallet } = await admin
        .from("wallets")
        .select("balance")
        .eq("user_id", user.id)
        .single();

      await admin
        .from("wallets")
        .update({ balance: (wallet?.balance || 0) + tx.amount, updated_at: new Date().toISOString() })
        .eq("user_id", user.id);

      // Update transaction status
      await admin
        .from("transactions")
        .update({ status: "success", updated_at: new Date().toISOString() })
        .eq("provider_reference", ref);

      return NextResponse.json({
        status:  "successful",
        amount:  tx.amount,
        message: `${tx.amount.toLocaleString()} RWF deposited to your wallet!`,
      });
    }

    if (tx.status === "failed") {
      await admin
        .from("transactions")
        .update({ status: "failed", updated_at: new Date().toISOString() })
        .eq("provider_reference", ref);

      return NextResponse.json({
        status:  "failed",
        message: "Payment was declined or timed out. Please try again.",
      });
    }

    // Still pending
    return NextResponse.json({ status: "pending", message: "Waiting for your approval…" });

  } catch (err: any) {
    console.error("[deposit/status] Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
