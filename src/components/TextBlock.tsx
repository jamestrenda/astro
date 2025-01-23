import type { TextBlock as Props } from '~/types/textBlock';
import { Container } from './Container';
import { FadeInStaggerChildren } from './FadeInStaggerChildren';
import { PortableText } from './PortableText/PortableText';

export const TextBlock = ({ portableText }: Props) => {
  return (
    <Container variant="tight" padding={true}>
      <div className="grid place-items-center text-muted [&_p]:text-xl [&_p]:font-light md:[&_p]:text-2xl">
        <FadeInStaggerChildren>
          <PortableText portableText={portableText} />
        </FadeInStaggerChildren>
      </div>
    </Container>
  );
};
