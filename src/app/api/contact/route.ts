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

    // Honeypot — pretend success, send nothing
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

    // Client = person who filled the form (must receive thank-you)
    const clientEmail = data.email.trim();
    // Owner = you (must receive the enquiry only)
    const ownerEmail = ownerInbox.trim();

    // 1) Enquiry → only to YOU
    const enquiry = await resend.emails.send({
      from,
      to: [ownerEmail],
      replyTo: clientEmail,
      subject: `New portfolio enquiry — ${data.name} (${data.projectType})`,
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

    // 2) Thank-you → only to the CLIENT (never to owner inbox)
    const thankYou = await resend.emails.send({
      from,
      to: [clientEmail],
      replyTo: ownerEmail,
      subject: "Thanks — I received your project details",
      html: buildClientThankYouHtml(data),
    });

    if (thankYou.error) {
      // Enquiry already delivered; don't fail the whole request
      console.error(
        "[contact] Client thank-you failed (enquiry was still sent):",
        {
          clientEmail,
          error: thankYou.error,
        },
      );
    } else {
      console.info("[contact] Emails sent", {
        enquiryTo: ownerEmail,
        thankYouTo: clientEmail,
      });
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
  phone?: string;
  projectType: string;
  details: string;
  budget?: string;
  timeline?: string;
}) {
  return `
    <h2>New portfolio enquiry</h2>
    <p>This message is for you (site owner). Reply to this email to contact the client.</p>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Client email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Mobile:</strong> ${escapeHtml(data.phone?.trim() || "Not provided")}</p>
    <p><strong>Project type:</strong> ${escapeHtml(data.projectType)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(data.budget || "Not specified")}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(data.timeline || "Not specified")}</p>
    <p><strong>Details:</strong></p>
    <p>${escapeHtml(data.details).replace(/\n/g, "<br />")}</p>
  `;
}

function buildClientThankYouHtml(data: {
  name: string;
  projectType: string;
}) {
  return `
    <p>Hi ${escapeHtml(data.name)},</p>
    <p>Thanks for reaching out via my portfolio. I received your enquiry about <strong>${escapeHtml(data.projectType)}</strong> and will get back to you soon with next steps.</p>
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
