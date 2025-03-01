import type { Hero as Props } from '~/types/hero';
import { getRadialGradient } from '~/utils/getRadialGradient';
import { BackgroundRadialGradient } from './BackgroundRadialGradient';
import BrowserWindow from './BrowserWindow';
import { Container } from './Container';


export const Hero = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-md:[&>div]:px-0! pb-15 relative">
      <Container>
        <BrowserWindow
          withStripes
          className="relative grid min-h-[550px] grid-cols-12 max-md:rounded-t-none md:min-h-[660px]"
        >
          <BackgroundRadialGradient
            style={{
              backgroundImage: `${getRadialGradient('var(--color-zinc-500)', 'rgba(0,0,0,.8)', 'hsla(0 0% 0% / .9)', '40% 30%', ['0%', '50%', '90%'])}, ${getRadialGradient('hsla(0 0% 0% / 0)', 'var(--color-zinc-200)', 'var(--color-zinc-400)', '0% 100%', ['0%', '30%', '90%'])}`,
            }}
          />
            {children}
        </BrowserWindow>
      </Container>
    </div>
  );
};
