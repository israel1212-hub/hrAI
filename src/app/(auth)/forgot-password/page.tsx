import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { forgotPasswordAction } from "@/app/actions";
import MarketingNav from "@/components/marketing-nav";
import { UrlProvider } from "@/components/url-provider";

export default async function ForgotPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#E8EEFF]">
      <div className="fixed inset-0 opacity-[0.35] pointer-events-none bg-grid-blue" />
      <MarketingNav />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-57px)] px-4 py-12">
        <div className="w-full max-w-[420px]">
          <div className="text-center mb-7">
            <h1 className="text-[#0F172A] text-3xl font-extrabold mb-2 font-syne">Reset your password</h1>
            <p className="text-[#64748B] text-sm">
              Remember it?{" "}
              <Link href="/sign-in" className="text-[#2563EB] font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
          <div className="bg-white rounded-2xl p-7 shadow-[0_8px_32px_rgba(37,99,235,0.12)] border border-[#E8EDF5]">
            <UrlProvider>
              <form className="flex flex-col gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[#0F172A] text-sm font-semibold">Email address</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required
                    className="w-full rounded-xl border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] focus:border-[#2563EB] focus:ring-[#2563EB]/10" />
                </div>
                <SubmitButton formAction={forgotPasswordAction} pendingText="Sending reset link..."
                  className="w-full py-3 rounded-xl bg-[#2563EB] text-white font-semibold hover:bg-[#1d53d4] shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-all">
                  Send reset link
                </SubmitButton>
                <FormMessage message={searchParams} />
              </form>
            </UrlProvider>
          </div>
          <SmtpMessage />
        </div>
      </div>
    </div>
  );
}
