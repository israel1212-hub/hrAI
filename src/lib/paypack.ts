// ─────────────────────────────────────────────────────────────────────────────
// Paypack Rwanda — Mobile Money Integration
// Supports: MTN MoMo + Airtel Money (Rwanda)
// Docs: https://paypack.rw/docs
// Sign up: https://paypack.rw
// ─────────────────────────────────────────────────────────────────────────────

const PAYPACK_BASE_URL = "https://payments.paypack.rw/api";

// ── Types ────────────────────────────────────────────────────────────────────

export interface PaypackAuthResponse {
  access: string;
  refresh: string;
  expires: number;
}

export interface PaypackCashinResponse {
  ref: string;
  status: "pending" | "successful" | "failed";
  kind: "CASHIN";
  amount: number;
  currency: string;
  client: string; // phone number
  created_at: string;
  updated_at: string;
}

export interface PaypackCashoutResponse {
  ref: string;
  status: "pending" | "successful" | "failed";
  kind: "CASHOUT";
  amount: number;
  currency: string;
  client: string;
  created_at: string;
  updated_at: string;
}

export interface PaypackTransactionStatus {
  ref: string;
  status: "pending" | "successful" | "failed";
  kind: "CASHIN" | "CASHOUT";
  amount: number;
  currency: string;
  client: string;
  created_at: string;
  updated_at: string;
}

// ── Auth token cache (in-memory, reused across requests) ─────────────────────

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

/** Get a valid Paypack access token (cached, auto-refreshes) */
async function getAccessToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && now < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const clientId     = process.env.PAYPACK_CLIENT_ID;
  const clientSecret = process.env.PAYPACK_CLIENT_SECRET;

  if (!clientId || !clientSecret ||
      clientId === "your_paypack_client_id_here" ||
      clientSecret === "your_paypack_client_secret_here") {
    throw new Error(
      "Paypack is not configured. " +
      "Sign up at https://paypack.rw and add PAYPACK_CLIENT_ID + PAYPACK_CLIENT_SECRET to .env.local"
    );
  }

  const res = await fetch(`${PAYPACK_BASE_URL}/auth/agents/authorize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Paypack auth failed: ${res.status}`);
  }

  const data: PaypackAuthResponse = await res.json();
  cachedToken  = data.access;
  // expires is in seconds from now
  tokenExpiresAt = now + (data.expires * 1000);
  return cachedToken;
}

function paypackHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

// ── Core functions ────────────────────────────────────────────────────────────

/**
 * CASHIN — Request money FROM a user's mobile wallet (deposit)
 * Triggers a USSD push to the user's phone.
 * User enters their PIN to approve.
 */
export async function paypackCashin(
  phone: string,
  amount: number
): Promise<PaypackCashinResponse> {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPACK_BASE_URL}/transactions/cashin`, {
    method: "POST",
    headers: paypackHeaders(token),
    body: JSON.stringify({
      amount,
      number: formatPhone(phone),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Cashin failed: ${res.status}`);
  }

  return res.json();
}

/**
 * CASHOUT — Send money TO a user's mobile wallet (withdrawal)
 * Sends money directly to the phone number — no PIN needed from user.
 */
export async function paypackCashout(
  phone: string,
  amount: number
): Promise<PaypackCashoutResponse> {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPACK_BASE_URL}/transactions/cashout`, {
    method: "POST",
    headers: paypackHeaders(token),
    body: JSON.stringify({
      amount,
      number: formatPhone(phone),
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Cashout failed: ${res.status}`);
  }

  return res.json();
}

/**
 * Check the status of a transaction by its ref
 */
export async function paypackGetTransaction(
  ref: string
): Promise<PaypackTransactionStatus> {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPACK_BASE_URL}/transactions/find/${ref}`, {
    headers: paypackHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Transaction lookup failed: ${res.status}`);
  }

  return res.json();
}

/**
 * Poll a transaction until it's successful or failed.
 * Tries every 3 seconds for up to 2 minutes.
 */
export async function paypackPollTransaction(
  ref: string,
  maxWaitMs = 120_000
): Promise<PaypackTransactionStatus> {
  const interval = 3_000;
  const deadline = Date.now() + maxWaitMs;

  while (Date.now() < deadline) {
    const tx = await paypackGetTransaction(ref);
    if (tx.status === "successful" || tx.status === "failed") {
      return tx;
    }
    await sleep(interval);
  }

  throw new Error("Transaction timed out — user may not have approved the USSD prompt");
}

import { formatPhone, detectNetwork } from "./phone";

export { formatPhone, detectNetwork };

/** Check if Paypack is configured */
export function isPaypackConfigured(): boolean {
  const id  = process.env.PAYPACK_CLIENT_ID;
  const sec = process.env.PAYPACK_CLIENT_SECRET;
  return !!id && !!sec &&
    id  !== "your_paypack_client_id_here" &&
    sec !== "your_paypack_client_secret_here";
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
