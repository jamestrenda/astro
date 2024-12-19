import { useScroll, useTransform } from "motion/react";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Overline } from "./Overline";
import { useRef } from "react";
import { FadeInScrollLinked } from "./FadeInScrollLinked";
import { headerHeight } from "~/store";
import { useStore } from "@nanostores/react";

interface Props {
  overline: string;
  heading: string;
  text: string;
}

export const TextBlock = ({ overline, heading, text }: Props) => {
  const $headerHeight = useStore(headerHeight);
  const target = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target,
    offset: ["start center", "end end"],
  });
  const overlineOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  return (
    <div
      ref={target}
      //   className="bg-black"
      //   style={{ height: `calc(100vh - ${$headerHeight}px)` }}
    >
      <Container variant="tight" padding={true}>
        {/* <FadeInScrollLinked opacity={overlineOpacity}> */}
        <Overline>{overline}</Overline>
        {/* </FadeInScrollLinked> */}
        {/* <FadeInScrollLinked opacity={headingOpacity}> */}
        <Heading level={2} className="mb-6">
          {heading}
        </Heading>
        {/* </FadeInScrollLinked> */}
        {/* <FadeInScrollLinked opacity={textOpacity}> */}
        <p className="text-xl md:text-2xl font-light">{text}</p>
        {/* </FadeInScrollLinked> */}
      </Container>
    </div>
  );
};
