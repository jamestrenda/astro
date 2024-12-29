import { Container } from "./Container";
import { FadeInStaggerChildren } from "./FadeInStaggerChildren";
import { Heading } from "./Heading";
import { Overline } from "./Overline";

type Props = {
  data?: any; // replace with portableText type
};

export const TextBlock = ({ data }: Props) => {
  return (
    <Container variant="tight" padding={true}>
      <div className="grid place-items-center">
        <FadeInStaggerChildren>
          <Overline>About me</Overline>
          <Heading className="mb-6">
            I'm driven by a commitment to solving problems through thoughtful,
            user-centered web development.
          </Heading>
          <p className="text-xl md:text-2xl font-light">
            Web development—much like life—is about tackling challenges and
            crafting solutions that make a difference. I'm passionate about
            creating thoughtful, user-centered interfaces that simplify
            complexities, connect people, and improve everyday experiences.
          </p>
        </FadeInStaggerChildren>
      </div>
    </Container>
  );
};
