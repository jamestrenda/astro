import { parseWithZod } from "@conform-to/zod";
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
      // const schema = createZodFormSchema(formData);
      const slug = formData.get("slug") as string;
      const pageType = formData.get("pageType") as string;

      const data = await getForm({
        pageType,
        slug,
      });

      console.log("action data", data);

      //   const result =parseWithZod(formData, { schema: schema });
      //   console.log("action result", input);
      return `Hello, Astro Actions!`;
    },
  }),
};
