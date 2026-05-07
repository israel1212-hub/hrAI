// Flutterwave integration for PayWave
// Docs: https://developer.flutterwave.com/docs

export const FLW_BASE_URL = "https://api.flutterwave.com/v3";

export const FREE_PLAN_LIMITS = {
  maxBalance: 500_000,
  maxSendPerDay: 5_000,
  maxWithdraw: 10_000,
  maxDeposit: 10_000,
} as const;

export const SUBSCRIPTION_PRICES = {
  monthly: 2_000,
  yearly: 15_000,
} as const;

// ── Key check ────────────────────────────────────────────────────────────────

function isFlutterwaveConfigured(): boolean {
  const key = process.env.FLUTTERWAVE_SECRET_KEY;
  return !!key && !key.startsWith("FLWSECK_TEST-your");
}

function flwHeaders() {
  return {
    Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
}

// ── Mock payment (used when Flutterwave keys are not configured) ─────────────

/**
 * Returns a mock payment link that points to the built-in mock checkout page.
 * The mock page auto-confirms the payment so you can test the full flow.
 */
function mockPaymentLink(payload: FlutterwavePaymentPayload): { status: string; message: string; data: { link: string } } {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const params = new URLSearchParams({
    tx_ref: payload.tx_ref,
    amount: String(payload.amount),
    currency: payload.currency,
    redirect_url: payload.redirect_url,
    customer_email: payload.customer.email,
    customer_name: payload.customer.name,
    title: payload.customizations?.title || "PayWave",
    description: payload.customizations?.description || "",
    meta: JSON.stringify(payload.meta || {}),
  });
  return {
    status: "success",
    message: "Mock payment link",
    data: { link: `${appUrl}/mock-payment?${params.toString()}` },
  };
}

// ── Flutterwave API helpers ──────────────────────────────────────────────────

/** Initiate a payment link — uses mock if keys not configured */
export async function initFlutterwavePayment(payload: FlutterwavePaymentPayload) {
  if (!isFlutterwaveConfigured()) {
    return mockPaymentLink(payload);
  }
  const res = await fetch(`${FLW_BASE_URL}/payments`, {
    method: "POST",
    headers: flwHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Flutterwave payment init failed");
  }
  return res.json() as Promise<{ status: string; message: string; data: { link: string } }>;
}

/** Verify a transaction — uses mock if keys not configured */
export async function verifyFlutterwaveTransaction(transactionId: string): Promise<FlutterwaveVerifyResponse> {
  // Mock transaction IDs start with "MOCK-"
  if (transactionId.startsWith("MOCK-")) {
    const [, txRef, amountStr, userId, type, billingCycle] = transactionId.split("|");
    return {
      status: "success",
      message: "Mock verification",
      data: {
        id: Date.now(),
        tx_ref: txRef,
        flw_ref: `FLW-MOCK-${Date.now()}`,
        amount: parseFloat(amountStr),
        currency: "RWF",
        charged_amount: parseFloat(amountStr),
        status: "successful",
        payment_type: "mock",
        customer: { id: 1, email: "mock@paywave.rw", name: "Mock User" },
        meta: { user_id: userId, type, billing_cycle: billingCycle || "" },
      },
    };
  }

  if (!isFlutterwaveConfigured()) {
    throw new Error("Flutterwave is not configured. Add FLUTTERWAVE_SECRET_KEY to .env.local");
  }

  const res = await fetch(`${FLW_BASE_URL}/transactions/${transactionId}/verify`, {
    headers: flwHeaders(),
  });
  if (!res.ok) throw new Error(`Flutterwave verify failed: ${res.status}`);
  return res.json() as Promise<FlutterwaveVerifyResponse>;
}

/** Generate a unique transaction reference */
export function generateTxRef(prefix = "PW") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface FlutterwavePaymentPayload {
  tx_ref: string;
  amount: number;
  currency: string;
  redirect_url: string;
  customer: {
    email: string;
    name: string;
    phonenumber?: string;
  };
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
  meta?: Record<string, string>;
}

export interface MobileMoneyPayload {
  phone_number: string;
  amount: number;
  currency: string;
  email: string;
  tx_ref: string;
  fullname?: string;
  network?: "MTN" | "AIRTEL";
}

export interface TransferPayload {
  account_bank: string;
  account_number: string;
  amount: number;
  currency: string;
  narration: string;
  reference: string;
  beneficiary_name?: string;
}

export interface FlutterwaveVerifyResponse {
  status: string;
  message: string;
  data: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    amount: number;
    currency: string;
    charged_amount: number;
    status: "successful" | "failed" | "pending";
    payment_type: string;
    customer: { id: number; email: string; name: string };
    meta?: Record<string, string>;
  };
}
