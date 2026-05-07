# PayWave — Digital Wallet Setup Guide

PayWave is a full-featured digital wallet application for Rwanda, built with Next.js, Supabase, and Flutterwave.

## 🚀 Features

### User System
- ✅ Email/password authentication (Supabase Auth)
- ✅ User registration with automatic wallet creation
- ✅ Email verification (OTP)
- ✅ Password reset flow
- ✅ User profile management

### Wallet Features
- ✅ View wallet balance (RWF)
- ✅ Deposit money (Flutterwave: MTN MoMo, Airtel Money, Card)
- ✅ Send money to other users (P2P transfers via email)
- ✅ Withdraw to mobile money (MTN/Airtel)
- ✅ Transaction history with status tracking
- ✅ Real-time balance updates

### Free vs Premium Plans

#### Free Plan (Default)
- Max send: **5,000 RWF/day**
- Max withdraw: **10,000 RWF**
- Max deposit: **10,000 RWF**
- Max balance: **500,000 RWF**

#### Premium Plan
- **2,000 RWF/month** or **15,000 RWF/year** (save 9,000 RWF)
- ✅ Unlimited transfers
- ✅ Unlimited withdrawals
- ✅ Unlimited deposits
- ✅ Unlimited balance
- ✅ Priority processing

### Payment Integration
- **Primary:** Flutterwave (MTN MoMo, Airtel Money, Visa, Mastercard)
- **Optional:** Stripe (for card payments)
- Webhook verification for secure payment processing
- Automatic subscription expiry enforcement

---

## 📦 Installation

### 1. Clone & Install Dependencies

\`\`\`bash
git clone <your-repo-url>
cd <project-folder>
npm install
\`\`\`

### 2. Database Setup (Supabase)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Run the migrations in order:
   - `supabase/migrations/initial-setup.sql`
   - `supabase/migrations/20240602_wallet_system.sql`

**Or use Supabase CLI:**

\`\`\`bash
supabase db push
\`\`\`

### 3. Environment Variables

Copy `.env.local` and fill in your keys:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Flutterwave (PRIMARY)
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your_public_key
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your_secret_key
FLUTTERWAVE_ENCRYPTION_KEY=your_encryption_key
FLUTTERWAVE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe (OPTIONAL)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
\`\`\`

#### Get Flutterwave Keys:
1. Sign up at [Flutterwave Dashboard](https://dashboard.flutterwave.com/)
2. Go to **Settings → API Keys**
3. Copy your **Public Key**, **Secret Key**, and **Encryption Key**
4. For webhooks: **Settings → Webhooks** → Set URL to `https://your-domain.com/api/flutterwave/webhook`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Security & Payment Verification

### Payment Flow (Deposit/Subscription)

1. User clicks "Deposit" or "Upgrade"
2. Backend creates pending transaction in DB
3. Backend calls Flutterwave API to generate payment link
4. User redirected to Flutterwave payment page
5. User completes payment (MTN MoMo, Airtel, Card)
6. Flutterwave redirects back to `/wallet/deposit/callback` or `/payment/callback`
7. Frontend calls `/api/flutterwave/verify` with transaction ID
8. Backend verifies payment with Flutterwave API (never trust redirect alone)
9. If successful:
   - **Deposit:** Credit wallet balance
   - **Subscription:** Upgrade user to premium, set expiry date
10. Transaction status updated to "success"

### Webhook Handler

Flutterwave also sends webhooks to `/api/flutterwave/webhook` for:
- Payment confirmations
- Subscription renewals
- Failed payments

**Webhook signature verification is enforced** using `FLUTTERWAVE_WEBHOOK_SECRET`.

---

## 🗂️ Database Schema

### `users` table (extended)
- `plan`: "free" | "premium"
- `plan_expires_at`: timestamp
- `balance`: bigint (RWF)
- `is_verified`: boolean
- `kyc_status`: "none" | "pending" | "approved"

### `wallets` table
- `user_id`: UUID (FK to auth.users)
- `balance`: bigint (RWF)
- `currency`: "RWF"
- `is_frozen`: boolean

### `transactions` table
- `type`: "deposit" | "send" | "receive" | "withdraw" | "subscription"
- `amount`: bigint (RWF)
- `status`: "pending" | "success" | "failed"
- `reference`: unique transaction ID
- `recipient_id`: UUID (for P2P transfers)
- `payment_provider`: "flutterwave" | "stripe" | "mtn" | "airtel" | "internal"

### `subscriptions` table
- `plan`: "premium"
- `billing_cycle`: "monthly" | "yearly"
- `status`: "active" | "cancelled" | "expired" | "pending"
- `expires_at`: timestamp

---

## 🛠️ API Routes

### Wallet Operations
- `POST /api/wallet/deposit` — Initiate deposit (returns Flutterwave payment link)
- `POST /api/wallet/send` — Send money to another user (P2P)
- `POST /api/wallet/withdraw` — Withdraw to mobile money
- `GET /api/wallet/balance` — Get current balance
- `GET /api/wallet/transactions` — Get transaction history

### Subscription
- `POST /api/subscribe` — Initiate premium subscription (returns payment link)

### Payment Verification
- `POST /api/flutterwave/verify` — Verify payment after redirect
- `POST /api/flutterwave/webhook` — Handle Flutterwave webhooks

---

## 🎨 UI Components

### Wallet Dashboard (`/wallet`)
- Balance card with plan indicator
- Quick actions: Deposit, Send, Withdraw
- Free plan limits banner (if applicable)
- Recent transactions list

### Modals
- `SendMoneyModal` — P2P transfer form
- `DepositModal` — Deposit amount selection
- `WithdrawModal` — Withdraw to mobile money
- `UpgradeModal` — Premium subscription pricing

### Pages
- `/` — Landing page
- `/sign-up` — Registration
- `/sign-in` — Login
- `/dashboard` — User dashboard
- `/wallet` — Wallet interface
- `/payment` — Upgrade to premium
- `/wallet/deposit/callback` — Deposit verification
- `/payment/callback` — Subscription verification

---

## 🧪 Testing

### Test Flutterwave Payments

Use Flutterwave test mode credentials:

**Test Cards:**
- **Visa:** 4187427415564246
- **Mastercard:** 5531886652142950
- **CVV:** 564
- **Expiry:** 09/32
- **PIN:** 3310
- **OTP:** 12345

**Test Mobile Money:**
- **MTN:** 078XXXXXXX
- **Airtel:** 073XXXXXXX
- **OTP:** Any 6 digits

### Test User Flow

1. Sign up → Email verification
2. Login → Dashboard
3. Go to Wallet → Deposit 5,000 RWF (test payment)
4. Send 1,000 RWF to another user (create 2nd account)
5. Try to send 10,000 RWF → Should show upgrade prompt (free limit)
6. Upgrade to Premium → Test subscription payment
7. After upgrade → Send 10,000 RWF (should work)

---

## 🚀 Deployment

### Deploy to Vercel

\`\`\`bash
vercel --prod
\`\`\`

### Set Environment Variables in Vercel

Go to **Project Settings → Environment Variables** and add all keys from `.env.local`.

### Update Flutterwave Webhook URL

In Flutterwave Dashboard:
- **Settings → Webhooks**
- Set URL to: `https://your-domain.vercel.app/api/flutterwave/webhook`

### Update Redirect URLs

Update `NEXT_PUBLIC_APP_URL` in environment variables to your production domain.

---

## 📝 Customization

### Change Project Name

Replace "PayWave" with your brand name in:
- `src/app/layout.tsx` (metadata)
- `src/components/marketing-nav.tsx` (logo)
- `src/components/app-shell.tsx` (logo)
- `src/app/page.tsx` (landing page)

### Change Currency

Replace "RWF" with your currency in:
- `src/lib/flutterwave.ts` (currency constants)
- `src/lib/wallet.ts` (formatRWF function)
- All wallet components

### Adjust Plan Limits

Edit `FREE_PLAN_LIMITS` in `src/lib/flutterwave.ts`:

\`\`\`typescript
export const FREE_PLAN_LIMITS = {
  maxBalance: 500_000,
  maxSendPerDay: 5_000,
  maxWithdraw: 10_000,
  maxDeposit: 10_000,
};
\`\`\`

### Adjust Subscription Prices

Edit `SUBSCRIPTION_PRICES` in `src/lib/flutterwave.ts`:

\`\`\`typescript
export const SUBSCRIPTION_PRICES = {
  monthly: 2_000,
  yearly: 15_000,
};
\`\`\`

---

## 🔒 Security Checklist

- ✅ All payment verification done server-side
- ✅ Webhook signature verification enforced
- ✅ Row-level security (RLS) enabled on Supabase tables
- ✅ User can only access their own wallet/transactions
- ✅ Plan limits enforced before transactions
- ✅ Subscription expiry checked on every wallet access
- ✅ Passwords hashed by Supabase Auth
- ✅ Environment variables never exposed to client

---

## 📞 Support

For issues or questions:
- Check Flutterwave docs: https://developer.flutterwave.com/docs
- Check Supabase docs: https://supabase.com/docs
- Review transaction logs in Supabase dashboard

---

## 📄 License

MIT License — feel free to use this for your own projects!
