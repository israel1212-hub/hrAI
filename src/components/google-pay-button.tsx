"use client";

import { useEffect, useRef, useState } from "react";

interface GooglePayButtonProps {
  amount: number;
  currency?: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    google?: any;
  }
}

export default function GooglePayButton({ amount, currency = "USD", onSuccess, onError }: GooglePayButtonProps) {
  const [isGooglePayAvailable, setIsGooglePayAvailable] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Pay API
    const script = document.createElement("script");
    script.src = "https://pay.google.com/gp/p/js/pay.js";
    script.async = true;
    script.onload = () => {
      initializeGooglePay();
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (buttonRef.current) {
        buttonRef.current.innerHTML = "";
      }
    };
  }, []);

  const initializeGooglePay = () => {
    if (!window.google || !window.google.payments) {
      onError("Google Pay API not loaded");
      return;
    }

    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST", // Change to PRODUCTION for live
    });

    const isReadyToPayRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
        },
      }],
    };

    paymentsClient.isReadyToPay(isReadyToPayRequest)
      .then((response: any) => {
        if (response.result) {
          setIsGooglePayAvailable(true);
          renderGooglePayButton(paymentsClient);
        } else {
          setIsGooglePayAvailable(false);
        }
      })
      .catch((error: any) => {
        console.error("Google Pay initialization error:", error);
        setIsGooglePayAvailable(false);
      });
  };

  const renderGooglePayButton = (paymentsClient: any) => {
    if (!buttonRef.current) return;

    const button = paymentsClient.createButton({
      onClick: handleGooglePayClick,
      allowedPaymentMethods: [{
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
        },
      }],
    });

    buttonRef.current.appendChild(button);
  };

  const handleGooglePayClick = () => {
    if (!window.google || !window.google.payments) {
      onError("Google Pay not available");
      return;
    }

    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST", // Change to PRODUCTION for live
    });

    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: process.env.NEXT_PUBLIC_GOOGLE_PAY_GATEWAY || "example",
            gatewayMerchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_GATEWAY_MERCHANT_ID || "exampleGatewayMerchantId",
          },
        },
      }],
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: amount.toString(),
        currencyCode: currency,
        countryCode: "US",
      },
      merchantInfo: {
        merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID || "12345678901234567890",
        merchantName: "HireMind AI",
      },
    };

    paymentsClient.loadPaymentData(paymentDataRequest)
      .then((paymentData: any) => {
        console.log("Google Pay payment successful:", paymentData);
        onSuccess({
          method: "google_pay",
          amount: amount,
          currency: currency,
          paymentData: paymentData,
        });
      })
      .catch((error: any) => {
        console.error("Google Pay payment error:", error);
        if (error.statusCode === "CANCELED") {
          onError("Payment cancelled by user");
        } else {
          onError("Payment failed");
        }
      });
  };

  if (!isGooglePayAvailable) {
    return (
      <div className="text-center py-4">
        <p className="text-[#64748B] text-sm">Google Pay is not available on this device</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div ref={buttonRef} className="flex justify-center" />
    </div>
  );
}