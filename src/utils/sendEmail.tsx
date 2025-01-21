import { render } from "@react-email/components";
import { type ReactElement } from "react";
import { z } from "zod";
import nodemailer from "nodemailer";

const EMAIL_API_KEY = import.meta.env.EMAIL_API_KEY;

const transporter = nodemailer.createTransport({
  service: "Postmark", // no need to set host or port etc.
  auth: {
    user: EMAIL_API_KEY,
    pass: EMAIL_API_KEY,
  },
});

const resendErrorSchema = z.union([
  z.object({
    name: z.string(),
    message: z.string(),
    statusCode: z.number(),
  }),
  z.object({
    name: z.literal("UnknownError"),
    message: z.literal("Unknown Error"),
    statusCode: z.literal(500),
    cause: z.any(),
  }),
]);
type ResendError = z.infer<typeof resendErrorSchema>;

const resendSuccessSchema = z.object({
  id: z.string(),
});

export const sendEmail = async ({
  react,
  from,
  ...options
}: {
  from: string;
  replyTo?: string;
  subject: string;
} & (
  | { html: string; text: string; react?: never }
  | { react: ReactElement; html?: never; text?: never }
)) => {
  const email = {
    from,
    ...options,
    ...(react ? await renderReactEmail(react) : null),
  };

  const response = await transporter.sendMail({
    from: email.from,
    to: email.from,
    replyTo: options.replyTo,
    subject: options.subject,
    text: email.text,
    html: email.html,
  });

  //   console.info("🔶 mocked email contents:", email.html);
};

async function renderReactEmail(react: ReactElement) {
  const [html, text] = await Promise.all([
    render(react),
    render(react, { plainText: true }),
  ]);
  return { html, text };
}
