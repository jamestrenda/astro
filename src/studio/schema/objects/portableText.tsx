import { defineType } from "sanity";
import { TypeIcon } from "lucide-react";
import { getPortableTextBlocks } from "~/studio/lib/utils";

export const Icon = () => <TypeIcon size="1em" />;

export default defineType({
  name: "portableText",
  type: "array",
  of: getPortableTextBlocks({
    styles: ["normal", "h2", "h3", "h4", "blockquote", "overline"],
  }),
});
