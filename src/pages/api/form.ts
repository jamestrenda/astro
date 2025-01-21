import { parseWithZod } from "@conform-to/zod";
import type { APIRoute } from "astro";
import { Email } from "~/components/emails/Email";
import { createZodFormSchema } from "~/utils/createZodFormSchema";
import { getForm, getFromEmail, getSettings } from "~/utils/sanity";
import { sendEmail } from "~/utils/sendEmail";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const slug = data.get("slug") as string;
  const pageType = data.get("pageType") as string;

  const form = await getForm({
    pageType,
    slug,
  });

  const schema = createZodFormSchema({
    fields: form.fields,
    honeypot: form.honeypot,
  });

  const submission = parseWithZod(data, {
    schema,
  });

  if (submission.status !== "success") {
    return new Response(
      JSON.stringify({
        result: submission.reply({
          formErrors: ["Please check your submission for errors."],
        }),
      }),
      {
        status: 400,
      }
    );
  }

  // TODO: handle the case where the email field is not present
  //       or there are multiple email fields
  //       or the email field is inside a form group
  const emailField = form.fields.find(
    (field) => field._type === "formField" && field.fieldType === "email"
  );

  const replyTo = emailField?.replyToEmail
    ? submission.value[emailField._key]
    : undefined;

  const { value } = submission;

  const from = await getFromEmail();

  try {
    await sendEmail({
      from,
      replyTo,
      subject: form.emailSubject ?? "New form submission",
      react: Email({ submission: value, form }),
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        result: submission.reply({
          formErrors: ["Internal server error. Please try again later."],
        }),
      }),
      {
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({
      result: {
        status: "success",
        message: "Thank you for reaching out. I'll be in touch.",
      },
    }),
    { status: 200 }
  );
};
