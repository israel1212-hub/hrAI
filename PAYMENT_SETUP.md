# Payment Integration Setup Guide

This guide explains how to configure the payment methods in HireMind AI.

## Environment Variables

Update your `.env.local` file with the following variables:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here

# Apple Pay Configuration
NEXT_PUBLIC_APPLE_PAY_MERCHANT_ID=your_apple_pay_merchant_id_here
NEXT_PUBLIC_APPLE_PAY_MERCHANT_DOMAIN=your-domain.com

# Google Pay Configuration
NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID=your_google_pay_merchant_id_here
NEXT_PUBLIC_GOOGLE_PAY_GATEWAY=your_payment_gateway_name
NEXT_PUBLIC_GOOGLE_PAY_GATEWAY_MERCHANT_ID=your_gateway_merchant_id
```

## Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create a new account or log in to existing account
3. Get your API keys from the Developers > API keys section
4. Copy the Publishable key to `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. Copy the Secret key to `STRIPE_SECRET_KEY`

### Creating Products and Prices

1. In Stripe Dashboard, go to Products
2. Create a product for your subscription (e.g., "HireMind AI Pro")
3. Add pricing for monthly and yearly plans
4. Copy the Price IDs to use in your API calls

### Webhook Setup

1. In Stripe Dashboard, go to Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks`
3. Select events: `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## PayPal Setup

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/sandbox)
2. Create a new app or use existing sandbox app
3. Copy the Client ID to `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
4. For production, use the live Client ID

## Apple Pay Setup

1. Register for Apple Pay at [Apple Developer](https://developer.apple.com/apple-pay/)
2. Create merchant certificates
3. Set up your merchant ID and domain
4. Update the environment variables
5. Create API endpoint `/api/apple-pay/validate-merchant` for merchant validation

## Google Pay Setup

1. Go to [Google Pay Business Console](https://pay.google.com/business/console/)
2. Create a merchant account
3. Get your merchant ID and gateway credentials
4. Update the environment variables
5. Configure your payment gateway integration

## Card Payment

The card payment form accepts:
- Visa
- Mastercard
- American Express
- JCB
- Discover

Cards are processed securely through Stripe.

## Testing

For testing Stripe payments, use these test card numbers:
- Success: 4242 4242 4242 4242
- Declined: 4000 0000 0000 0002
- Requires authentication: 4000 0025 0000 3155

## Webhook Testing

Use Stripe CLI to test webhooks locally:

```bash
stripe listen --forward-to localhost:3000/api/webhooks
```

## Security Notes

- Never commit real API keys to version control
- Use test keys for development
- Rotate keys regularly in production
- Monitor webhook endpoints for failures
- American Express
- JCB
- Discover
- **Equity Bank of Rwanda** (added for local support)

## Testing

- PayPal: Use sandbox credentials
- Apple Pay: Requires iOS device with Apple Pay enabled
- Google Pay: Use test environment
- Cards: Use test card numbers (4242 4242 4242 4242 for Stripe testing)

## Security Notes

- Never commit real API keys to version control
- Use HTTPS in production
- Implement proper error handling and logging
- Validate payments on your server before granting access