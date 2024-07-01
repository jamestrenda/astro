import { defineField } from "sanity";

export default defineField({
  name: "anchor",
  title: "Anchor ID",
  type: "string",
  validation: (Rule) =>
    Rule.custom((anchor) => {
      // validate the anchor against the HTML5 spec
      if (anchor && !/^[a-z][a-z0-9:_-]*$/.test(anchor)) {
        return "Anchor must be a valid HTML5 id (lowercase letters, numbers, colons, underscores, and hyphens) and start with a letter.";
      }

      return true;
    }),
});
