"use client";

import { useEffect, useRef } from "react";

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  billing?: "monthly" | "yearly";
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayPalButton({ amount, currency = "USD", billing = "yearly", onSuccess, onError }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load PayPal SDK if not already loaded
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=${currency}&components=buttons`;
      script.async = true;
      script.onload = () => {
        renderPayPalButton();
      };
      document.head.appendChild(script);
    } else {
      renderPayPalButton();
    }

    function renderPayPalButton() {
      if (window.paypal && paypalRef.current) {
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                description: `HireMind AI ${billing === "yearly" ? "Yearly" : "Monthly"} Subscription`,
                amount: {
                  currency_code: currency,
                  value: amount.toString(),
                  breakdown: {
                    item_total: {
                      currency_code: currency,
                      value: amount.toString(),
                    },
                  },
                },
                items: [{
                  name: `HireMind AI ${billing === "yearly" ? "Yearly" : "Monthly"} Plan`,
                  description: `Professional AI-powered interview platform - ${billing} billing`,
                  quantity: "1",
                  unit_amount: {
                    currency_code: currency,
                    value: amount.toString(),
                  },
                }],
              }],
              application_context: {
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW",
                brand_name: "HireMind AI",
              },
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              console.log("PayPal payment completed:", details);
              onSuccess({
                orderID: data.orderID,
                payer: details.payer,
                purchase_units: details.purchase_units,
                amount: amount,
                currency: currency,
                billing: billing,
              });
            });
          },
          onError: (error: any) => {
            console.error("PayPal payment error:", error);
            onError({
              message: "PayPal payment failed",
              details: error,
            });
          },
          onCancel: (data: any) => {
            console.log("PayPal payment cancelled:", data);
            onError({
              message: "Payment cancelled by user",
              details: data,
            });
          },
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          },
        }).render(paypalRef.current);
      }
    }

    return () => {
      // Cleanup if needed
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    };
  }, [amount, currency, billing, onSuccess, onError]);

  return (
    <div className="space-y-4">
      <div ref={paypalRef} />
      <div className="text-center">
        <p className="text-[#64748B] text-xs">
          You will be redirected to PayPal to complete your secure payment.
        </p>
        <p className="text-[#64748B] text-xs mt-1">
          PayPal accepts Visa, Mastercard, American Express, and more.
        </p>
      </div>
    </div>
  );
}