import type { TextBlock as Props } from '~/types/textBlock';
import { Container } from './Container';
import { PortableText } from './PortableText/PortableText';

export const TextBlock = ({ portableText }: Props) => {
  return (
    <Container variant="tight" padding={true}>
      <div className="text-zinc-500 [&_p]:text-xl [&_p]:font-light md:[&_p]:text-2xl">
        <PortableText portableText={portableText} />
      </div>
    </Container>
  );
};
