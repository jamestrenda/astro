import { Overline } from "../Overline";
import { Heading } from "../Heading";
import type { PortableTextComponents } from "@portabletext/react";
import { FadeIn } from "../FadeIn";

export const Block: PortableTextComponents["block"] = {
  h2: ({ children }) => {
    return (
      <FadeIn>
        <Heading level="h2">{children}</Heading>
      </FadeIn>
    );
  },
  normal: ({ children }) => {
    return (
      <FadeIn>
        <p>{children}</p>
      </FadeIn>
    );
  },
  overline: ({ children }) => {
    return (
      <FadeIn>
        <Overline>{children}</Overline>
      </FadeIn>
    );
  },
  // add more block-level components here.
};
