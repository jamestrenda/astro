import { parseWithZod } from "@conform-to/zod";
import { ActionError } from "astro:actions";
import { defineAction } from "astro:actions";
import { createZodFormSchema } from "~/utils/createZodFormSchema";
import { getForm } from "~/utils/sanity";

export const server = {
  submitForm: defineAction({
    accept: "form",
    handler: async (formData) => {
      const slug = formData.get("slug") as string;
      const pageType = formData.get("pageType") as string;

      const data = await getForm({
        pageType,
        slug,
      });

      console.log("action data", data);

      const schema = createZodFormSchema(data);

      const submission = parseWithZod(formData, {
        schema,
      });

      if (submission.status !== "success") {
        const { error } = submission.reply();
        console.error(error);
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Invalid form submission",
        });
      }
      //   console.log("action result", input);
      return `Thank you!`;
    },
  }),
};
