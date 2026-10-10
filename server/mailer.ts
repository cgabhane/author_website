import { Resend } from "resend";

export interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}

export type EmailTransport = (message: EmailMessage) => Promise<void>;

function resendTransport(): EmailTransport | null {
  if (!process.env.RESEND_API_KEY) return null;
  const resend = new Resend(process.env.RESEND_API_KEY);
  return async (message) => {
    const { error } = await resend.emails.send(message);
    if (error) throw new Error(`Email provider rejected the message: ${error.name}`);
  };
}

let transport: EmailTransport | null | undefined;

// Tests replace the transport so no real email is ever sent.
export function setEmailTransport(next: EmailTransport | null): void {
  transport = next;
}

// Sends one email. Returns false (and logs no recipient or content) on failure.
export async function sendEmail(message: EmailMessage, label: string): Promise<boolean> {
  if (transport === undefined) transport = resendTransport();
  if (!transport) {
    console.warn(`[email] ${label}: skipped, RESEND_API_KEY is not configured`);
    return false;
  }
  try {
    await transport(message);
    console.log(`[email] ${label}: sent`);
    return true;
  } catch (error) {
    console.error(`[email] ${label}: failed (${error instanceof Error ? error.name : "unknown error"})`);
    return false;
  }
}
