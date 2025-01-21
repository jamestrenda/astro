import type { TextBlock as Props } from "~/types/textBlock";
import { Container } from "./Container";
import { FadeInStaggerChildren } from "./FadeInStaggerChildren";
import { PortableText } from "./PortableText/PortableText";

export const TextBlock = ({ portableText }: Props) => {
  return (
    <Container variant="tight" padding={true}>
      <div className="grid place-items-center [&_p]:text-xl md:[&_p]:text-2xl [&_p]:font-light text-muted">
        <FadeInStaggerChildren>
          <PortableText portableText={portableText} />
        </FadeInStaggerChildren>
      </div>
    </Container>
  );
};
