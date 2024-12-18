import type { Theme } from "~/utils/theme";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { headerHeight } from "~/store";
import { useEffect } from "react";
import { useIsClient, useMeasure } from "@uidotdev/usehooks";

interface Props {
  theme: Theme | undefined;
}

export const Header = ({ theme }: Props) => {
  const [ref, { height }] = useMeasure();
  const isClient = useIsClient();

  useEffect(() => {
    if (!height) return;

    headerHeight.set(height);
  }, [height]);

  return (
    <header ref={ref} className="bg-background dark:bg-black sticky top-0">
      <Container className="flex items-center justify-between">
        <nav>
          <a
            href="/"
            className="flex py-2 starting:opacity-0 starting:-translate-y-2 transition duration-500"
            title="Go to homepage"
          >
            <Logo />
          </a>
        </nav>
        {isClient ? <ThemeToggle initial={theme} /> : null}
      </Container>
    </header>
  );
};
