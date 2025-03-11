import { getRadialGradient } from '~/utils/getRadialGradient';
import { cn } from '~/utils/misc';
import { BackgroundRadialGradient } from './BackgroundRadialGradient';
import BrowserWindow from './BrowserWindow';
import { Container } from './Container';

export const Hero = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('relative pb-15 max-md:[&>div]:px-0!', className)}>
      <Container>
        <BrowserWindow
          withStripes
          className="relative grid min-h-[550px] w-full grid-cols-12 max-md:rounded-t-none md:min-h-[660px]"
        >
          <BackgroundRadialGradient
            style={{
              backgroundImage: `${getRadialGradient('var(--color-zinc-500)', 'rgba(0,0,0,.8)', 'hsla(0 0% 0% / .9)', '40% 30%', ['0%', '50%', '90%'])}, ${getRadialGradient('hsla(0 0% 0% / 0)', 'var(--color-zinc-200)', 'var(--color-zinc-400)', '0% 100%', ['0%', '30%', '90%'])}`,
            }}
          />
          <div className="contents text-lg leading-6 *:*:space-y-3 [&_p]:font-light [&_p]:text-zinc-500! md:[&_p]:text-xl dark:[&_p]:text-foreground">
            {children}
          </div>
        </BrowserWindow>
      </Container>
    </div>
  );
};
