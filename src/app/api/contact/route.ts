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
    const { from, to } = getContactEmails();

    if (!resend || !from) {
      return NextResponse.json(
        {
          error:
            "Contact form email delivery is not configured yet. Please email pardeepkaushik0508@gmail.com directly.",
        },
        { status: 503 },
      );
    }

    const subject = `Portfolio inquiry from ${data.name} — ${data.projectType}`;
    const html = `
      <h2>New portfolio contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Project Type:</strong> ${escapeHtml(data.projectType)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(data.budget || "Not specified")}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(data.timeline || "Not specified")}</p>
      <p><strong>Details:</strong></p>
      <p>${escapeHtml(data.details).replace(/\n/g, "<br />")}</p>
    `;

    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      html,
    });

    if (result.error) {
      return NextResponse.json(
        {
          error:
            "Email delivery failed. Please try again later or contact me directly via email or WhatsApp.",
        },
        { status: 502 },
      );
    }

    try {
      await resend.emails.send({
        from,
        to: [data.email],
        subject: "Thanks — I received your project details",
        html: `
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>Thanks for reaching out. I received your enquiry about <strong>${escapeHtml(data.projectType)}</strong> and will reply soon with next steps.</p>
          <p>— Pardeep Kaushik</p>
        `,
      });
    } catch {
      // Acknowledgement is best-effort; enquiry already delivered
    }

    return NextResponse.json({
      message: "Thanks — your project details were sent successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Unexpected server error. Please try again or email pardeepkaushik0508@gmail.com.",
      },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
