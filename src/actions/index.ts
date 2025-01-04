import { parseWithZod } from "@conform-to/zod";
import { ActionError } from "astro:actions";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { formZ } from "~/types/form";
import { createZodFormSchema } from "~/utils/createZodFormSchema";
import { getForm } from "~/utils/sanity";
// import { getForm, getIndex } from "~/utils/sanity";

export const server = {
  // action declarations
  submitForm: defineAction({
    accept: "form",
    // input: formZ.shape.customFormFields.element,
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
