# Payment Integration Setup Guide

This guide explains how to configure the payment methods in HireMind AI.

## Environment Variables

Update your `.env.local` file with the following variables:

```env
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