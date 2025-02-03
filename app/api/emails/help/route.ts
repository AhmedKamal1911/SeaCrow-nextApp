import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { QuestionFormSchema } from "@/lib/validations/questionsFormSchema";
import { HelpMessage } from "@/emails/HelpMessage";

const resend = new Resend(process.env.RESEND_API_KEY);

const ERRORS = {
  validation_error: {
    status: 400,
    statusText: "Ops! Something went wrong please try again later",
  },

  rate_limit_exceeded: {
    status: 429,
    statusText: "Too many requests.",
  },
  security_error: {
    status: 451,
    statusText: "We may have found a security issue with the request.",
  },
  application_error: {
    status: 500,
    statusText: "An unexpected error occurred.",
  },
};

export async function POST(req: NextRequest) {
  try {
    // Extract data from the request body
    const formData: QuestionFormSchema = await req.json();
    // Render React Email component to HTML
    const emailHtml = HelpMessage({ ...formData });
    // Send email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified domain
      to: "khmedamal@gmail.com",
      subject: formData.subject,
      react: emailHtml,
    });
    if (error) {
      return NextResponse.json(
        {
          message:
            ERRORS[error.name as keyof typeof ERRORS].statusText ??
            "Something went wrong!",
        },
        { statusText: "Bad Request", status: 400 }
      );
    }
    return NextResponse.json({ success: true, data: emailData });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { statusText: error.name, status: 500 }
      );
    }
  }
}
