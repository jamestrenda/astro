import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { formZ } from "~/types/form";

export const server = {
  // action declarations
  submitForm: defineAction({
    accept: "form",
    input: formZ.shape.customFormFields.element,
    handler: async (input) => {
      console.log(input);
      return `Hello, Astro Actions!`;
    },
  }),
};
