import type { CurrentUser } from "@sanity/types";
import type { SlugRule } from "sanity";

import slug from "slug";

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
