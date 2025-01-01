import { Container } from "./Container";
import { FadeInStaggerChildren } from "./FadeInStaggerChildren";
import { PortableText, type Props } from "./PortableText/PortableText";

export const TextBlock = ({ value }: Props) => {
  return (
    <Container variant="tight" padding={true}>
      <div className="grid place-items-center [&_p]:text-xl md:[&_p]:text-2xl [&_p]:font-light">
        <FadeInStaggerChildren>
          <PortableText value={value} />
        </FadeInStaggerChildren>
      </div>
    </Container>
  );
};
