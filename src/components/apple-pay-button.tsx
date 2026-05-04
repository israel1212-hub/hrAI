"use client";

import { useEffect, useRef, useState } from "react";

interface ApplePayButtonProps {
  amount: number;
  currency?: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    ApplePaySession?: any;
  }
}

export default function ApplePayButton({ amount, currency = "USD", onSuccess, onError }: ApplePayButtonProps) {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check if Apple Pay is available
    if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
      setIsApplePayAvailable(true);
    }
  }, []);

  const handleApplePayClick = async () => {
    if (!window.ApplePaySession) {
      onError("Apple Pay is not supported on this device");
      return;
    }

    try {
      // Create Apple Pay session
      const paymentRequest = {
        countryCode: "US",
        currencyCode: currency,
        supportedNetworks: ["visa", "masterCard", "amex", "discover"],
        merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
        total: {
          label: "HireMind AI Subscription",
          amount: amount.toString(),
        },
        requiredBillingContactFields: ["postalAddress", "name"],
        requiredShippingContactFields: [],
      };

      const session = new window.ApplePaySession(3, paymentRequest);

      session.onvalidatemerchant = async (event: any) => {
        // In a real implementation, you would validate the merchant with your server
        // This would call your backend API to get the merchant session from Apple
        try {
          const response = await fetch("/api/apple-pay/validate-merchant", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              validationURL: event.validationURL,
              merchantIdentifier: process.env.NEXT_PUBLIC_APPLE_PAY_MERCHANT_ID,
              domainName: process.env.NEXT_PUBLIC_APPLE_PAY_MERCHANT_DOMAIN,
            }),
          });

          if (!response.ok) {
            throw new Error("Merchant validation failed");
          }

          const merchantSession = await response.json();
          session.completeMerchantValidation(merchantSession);
        } catch (error) {
          console.error("Merchant validation error:", error);
          session.abort();
          onError("Merchant validation failed");
        }
      };

      session.onpaymentauthorized = (event: any) => {
        // Process the payment
        const payment = event.payment;
        console.log("Apple Pay payment authorized:", payment);

        // In a real implementation, send payment token to your payment processor
        // For demo purposes, we'll simulate success
        session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
        onSuccess({
          method: "apple_pay",
          amount: amount,
          currency: currency,
          paymentData: payment,
          billingContact: payment.billingContact,
        });
      };

      session.oncancel = () => {
        onError("Payment cancelled by user");
      };

      session.begin();
    } catch (error) {
      console.error("Apple Pay error:", error);
      onError("Failed to initialize Apple Pay");
    }
  };

  if (!isApplePayAvailable) {
    return (
      <div className="text-center py-4">
        <p className="text-[#64748B] text-sm">Apple Pay is not available on this device</p>
      </div>
    );
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleApplePayClick}
      className="w-full py-3 px-4 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      Pay with Apple Pay
    </button>
  );
}