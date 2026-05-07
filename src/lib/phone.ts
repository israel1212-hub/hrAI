// Shared phone utilities — safe to use in both client and server components

/** Normalize Rwandan phone numbers to 07XXXXXXXX format */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("250") && digits.length === 12) return "0" + digits.slice(3);
  if (digits.startsWith("07") && digits.length === 10) return digits;
  return digits;
}

/** Detect MTN or Airtel from Rwandan phone number */
export function detectNetwork(phone: string): "MTN" | "AIRTEL" | "UNKNOWN" {
  const digits = formatPhone(phone);
  const prefix = digits.slice(0, 3);
  if (["078", "079", "077", "076"].includes(prefix)) return "MTN";
  if (["073", "072"].includes(prefix))               return "AIRTEL";
  return "UNKNOWN";
}
