import { Resend } from "resend";

function trimEnv(value: string | undefined) {
  return value?.trim() || undefined;
}

export function getResendClient() {
  const apiKey = trimEnv(process.env.RESEND_API_KEY);
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export function getContactEmails() {
  const from = trimEnv(process.env.CONTACT_FROM_EMAIL);
  const to =
    trimEnv(process.env.CONTACT_TO_EMAIL) || "pardeepkaushik0508@gmail.com";
  return { from, to };
}
