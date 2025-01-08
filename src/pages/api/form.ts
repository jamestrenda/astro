import { parseWithZod } from "@conform-to/zod";
import type { APIRoute } from "astro";
import { createZodFormSchema } from "~/utils/createZodFormSchema";
import { getForm } from "~/utils/sanity";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const slug = data.get("slug") as string;
  const pageType = data.get("pageType") as string;

  const form = await getForm({
    pageType,
    slug,
  });

  const schema = createZodFormSchema(form);

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

  // Do something with the data...

  // handle any additional errors...

  // then return a success response....
  return new Response(
    JSON.stringify({
      result: {
        status: "success",
        message: "Thank you for reaching out. I'll be in touch.",
      },
      // result: submission.reply(),
    }),
    { status: 200 }
  );
};
