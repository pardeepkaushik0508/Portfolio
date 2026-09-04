import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { getContactEmails, getResendClient } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check the form fields and try again.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.website && data.website.length > 0) {
      return NextResponse.json({
        message: "Thanks — your project details were sent successfully.",
      });
    }

    const resend = getResendClient();
    const { from, to: ownerInbox } = getContactEmails();

    if (!resend || !from || !ownerInbox) {
      console.error("[contact] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL");
      return NextResponse.json(
        {
          error:
            "Contact form email delivery is not configured yet. Please email pardeepkaushik0508@gmail.com directly.",
        },
        { status: 503 },
      );
    }

    const clientEmail = data.email.trim();
    const ownerEmail = ownerInbox.trim();
    const source = data.source?.trim() || "website";

    const enquiry = await resend.emails.send({
      from,
      to: [ownerEmail],
      replyTo: clientEmail,
      subject: `New portfolio enquiry — ${data.name} (${source})`,
      html: buildOwnerEnquiryHtml(data),
    });

    if (enquiry.error) {
      console.error("[contact] Owner enquiry failed:", enquiry.error);
      const hint = resendErrorHint(enquiry.error);
      return NextResponse.json(
        {
          error:
            hint ||
            "Email delivery failed. Please try again later or contact me directly via email or WhatsApp.",
        },
        { status: 502 },
      );
    }

    const thankYou = await resend.emails.send({
      from,
      to: [clientEmail],
      replyTo: ownerEmail,
      subject: "Thanks — I received your project details",
      html: buildClientThankYouHtml(data),
    });

    if (thankYou.error) {
      console.error(
        "[contact] Client thank-you failed (enquiry was still sent):",
        { clientEmail, error: thankYou.error },
      );
    }

    return NextResponse.json({
      message: "Thanks — your project details were sent successfully.",
    });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      {
        error:
          "Unexpected server error. Please try again or email pardeepkaushik0508@gmail.com.",
      },
      { status: 500 },
    );
  }
}

function buildOwnerEnquiryHtml(data: {
  name: string;
  email: string;
  phone: string;
  details: string;
  source?: string;
}) {
  return `
    <h2>New portfolio enquiry</h2>
    <p>This message is for you (site owner). Reply to this email to contact the client.</p>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Client email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Mobile:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Source:</strong> ${escapeHtml(data.source || "website")}</p>
    <p><strong>Requirement:</strong></p>
    <p>${escapeHtml(data.details).replace(/\n/g, "<br />")}</p>
  `;
}

function buildClientThankYouHtml(data: { name: string }) {
  return `
    <p>Hi ${escapeHtml(data.name)},</p>
    <p>Thanks for reaching out via my portfolio. I received your requirement and will get back to you soon with next steps — including estimate timing where possible.</p>
    <p>If you need to add anything, just reply to this email.</p>
    <p>— Pardeep Kaushik<br />Full-Stack Developer</p>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function resendErrorHint(error: unknown): string | null {
  const message =
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
      ? (error as { message: string }).message.toLowerCase()
      : "";

  if (
    message.includes("domain") ||
    message.includes("not verified") ||
    message.includes("from")
  ) {
    return "Email sender is not verified in Resend. Set CONTACT_FROM_EMAIL to an address on your verified domain, e.g. Pardeep <hello@pardeepkaushik.info>.";
  }

  if (message.includes("api key") || message.includes("unauthorized")) {
    return "Resend API key is invalid. Check RESEND_API_KEY in your hosting environment variables.";
  }

  return null;
}
