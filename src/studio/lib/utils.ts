import type { CurrentUser, PortableTextTextBlock } from "@sanity/types";
import type { PortableTextBlock, SlugRule } from "sanity";

import slug from "slug";
import type { ImageObject } from "~/types/image";
import { getImageObjectTitle } from "../schema/objects/image";

const MAX_LENGTH = 96;

export const validateSlug = ({
  skipValidation = false,
  rule,
}: {
  skipValidation: boolean;
  rule: SlugRule;
}) => {
  return rule.custom((value) => {
    if (skipValidation) {
      return true;
    }
    const currentSlug = value && value.current;
    if (!currentSlug) {
      return true;
    }

    if (currentSlug.length >= MAX_LENGTH) {
      return `Must be less than ${MAX_LENGTH} characters`;
    }

    return true;
  });
};

export const formatSlug = (input: string) => {
  const formattedSlug = slug(input);

  return formattedSlug;
};

export function isAdminUser(user: Omit<CurrentUser, "role"> | null) {
  return !!user?.roles.find(({ name }) => name === "administrator");
}

export function getPortableTextPreview(
  blocks: PortableTextBlock[],
  title: string
) {
  if (!blocks) {
    return {
      title,
    };
  }

  let block;
  switch (blocks[0]?._type) {
    case "block":
      block = blocks[0] as PortableTextTextBlock;

      // Get the first block of text, which could be broken up into multiple children depending on "marks" (i.e. formatting)
      const textSnippet = block?.children.map((child) => child.text).join("");

      return {
        title: textSnippet?.length ? textSnippet : title,
        subtitle: textSnippet && title, // if title is set, show the type as the subtitle
      };
    // TODO: This is not available in the portable text schema, but could be added.
    //       But might want to consider changing the "Text Block" title to "Portable Content" or "Rich Content"
    //       to indicate that it can contain multiple block types (e.g. block, image, etc.) not just text
    case "imageObject":
      block = blocks[0] as ImageObject;
      return {
        title: block.altText ?? block.image.asset?.altText ?? "Image",
        subtitle: block.caption ?? getImageObjectTitle(),
        media: block.image.asset?._id,
      };
    default:
      return {
        title,
      };
  }
}
