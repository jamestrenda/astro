import { useMeasure } from '@uidotdev/usehooks';
import { CircleCheckBigIcon, ExternalLinkIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { forwardRef, useCallback, useState, type ComponentProps } from 'react';
import type { Portfolio as Props } from '~/types/portfolio';
import { cn } from '~/utils/misc';
import BrowserWindow from './BrowserWindow';
import { Container } from './Container';
import { FadeIn } from './FadeIn';
import { Heading } from './Heading';
import { Image, Source } from './Image';
import { Overline } from './Overline';
import { PortableText } from './PortableText/PortableText';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const Portfolio = ({ title, items }: Props) => {
  const totalItems = items.length;
  const [activeTab, setActiveTab] = useState(items[0].id);
  const activeIndex = items.findIndex(({ id }) => id === activeTab);
  const [prevIndex, setPrevIndex] = useState<number>(activeIndex);
  const jumpCount = Math.abs(activeIndex - prevIndex);

  const direction = activeIndex >= prevIndex ? 'forwards' : 'backwards';

  const handleChange = useCallback(
    (tab?: Props['items'][number]['id']) => {
      setPrevIndex(activeIndex);
      setActiveTab(tab || items[activeIndex + 1]?.id || items[0].id);
    },
    [activeIndex, items],
  );

  return (
    <div className="relative">
      <div
        className="relative h-[480px] lg:h-[680px]"
        // style={{
        //   backgroundImage: `linear-gradient(to right, var(--color-zinc-900), var(--color-zinc-950)), ${getRadialGradient('var(--color-zinc-700)', 'var(--color-zinc-900)', 'var(--color-zinc-950)', '50% 90%', ['0%', '50%', '70%'])}`,
        // }}
      >
        <div className="absolute inset-0 bg-[image:radial-gradient(circle_at_30%_30%,var(--color-stone-100)_0%,var(--color-stone-200)_50%,var(--color-stone-300)_70%)] dark:bg-[image:radial-gradient(circle_at_30%_30%,var(--color-zinc-700)_0%,var(--color-zinc-950)_50%,var(--color-zinc-950)_70%)]"></div>
        <div className="absolute inset-0 bg-[image:radial-gradient(circle_at_60%_80%,var(--color-stone-100)_0%,var(--color-stone-200)_50%,var(--color-stone-300)_70%)] opacity-50 dark:bg-[image:radial-gradient(circle_at_60%_80%,var(--color-zinc-700)_0%,var(--color-zinc-950)_50%,var(--color-zinc-950)_70%)]"></div>
        <div className="border-x-(--pattern-fg) [--pattern-fg:var(--color-stone-600)]/5 dark:[--pattern-fg:var(--color-black)]/20 pointer-events-none absolute inset-0 col-start-4 row-span-5 row-start-1 border-x bg-black/5 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed backdrop-blur-lg"></div>
      </div>
      <div className="absolute inset-x-0 top-24 lg:top-40">
        <Container className="flex max-w-none flex-col items-center">
          {title && (
            <h2>
              <Overline>{title}</Overline>
            </h2>
          )}
          <Tabs
            defaultValue={items[0].id}
            value={activeTab}
            onValueChange={handleChange}
            className="flex w-full flex-col"
          >
            <TabsList className="py-4">
              {items.map((item) => {
                return (
                  <TabsTrigger
                    key={item._key}
                    value={item.id}
                    active={activeTab === item.id}
                    className="text-foreground dark:text-foreground dark:data-[state=active]:text-background"
                  >
                    {item.client}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <div className="relative mx-auto mt-10 w-full max-w-7xl">
              {items.map((item, index) => {
                const active = activeTab === item.id;
                const inMiddle = 0 < index && index < totalItems - 1;

                return (
                  <div key={item.id}>
                    <Project
                      index={index}
                      totalItems={totalItems}
                      onClick={handleChange}
                      active={active}
                      jumping={
                        inMiddle &&
                        !active &&
                        jumpCount > 1 &&
                        index !== prevIndex
                      }
                      visible={index >= activeIndex}
                      offset={index - activeIndex}
                      direction={direction}
                      {...item}
                    />
                  </div>
                );
              })}
            </div>
          </Tabs>
        </Container>
      </div>
      <div className="h-[354px] bg-transparent lg:h-[420px]"></div>
    </div>
  );
};

const Project = forwardRef<
  HTMLDivElement,
  Omit<ComponentProps<'div'>, 'onClick' | 'title'> &
    Omit<Props['items'][number], 'client'> & {
      index: number;
      active: boolean;
      jumping: boolean;
      visible: boolean;
      offset: number;
      direction: 'forwards' | 'backwards';
      totalItems: number;
      onClick: (id?: string) => void;
    }
>(
  (
    {
      id,
      index,
      onClick,
      direction,
      totalItems,
      active,
      jumping,
      visible,
      offset,
      ...props
    },
    forwardedRef,
  ) => {
    const [ref, { width }] = useMeasure();

    // Scale down each container by 32px (16px on each side). e.g. at 1280px it would be 0.025 or 1 - 0.025 = 0.975.
    // I prefer to specify the scale based on pixels than to simply hardcode .975. This way it's easier to adjust
    // and it's more explicit.
    const widthScale = (width && 32 / width) || 0;

    const scale = !visible ? 1 : 1 - widthScale * offset;

    const { title, description, url, image, mobileImage, features } = props;

    return (
      <TabsContent
        ref={forwardedRef}
        asChild
        value={id}
        forceMount
        onClick={() => onClick(id)}
      >
        <motion.div
          ref={ref}
          className={cn(
            'group absolute inset-x-0 top-16 rounded-lg shadow-xl',
            'mx-auto w-full origin-top',
            !visible
              ? 'pointer-events-none'
              : active
                ? 'cursor-default'
                : 'cursor-pointer',
          )}
          initial={{
            y: 0,
            marginTop: 0,
            opacity: 1,
            scale,
          }}
          whileInView="animate"
          animate="animate"
          viewport={{ once: true, amount: 0.5 }}
          whileHover="hover"
          variants={{
            hover: {
              '--lightness': visible && !active ? `20%` : `${index * 7}%`,
              transition: { duration: 0.3, ease: 'easeOut' },
            },
            animate: {
              scale,
              opacity: !visible
                ? [1, 1, 0]
                : active && direction === 'backwards'
                  ? [0, 1, 1]
                  : [1, 1, 1],
              y: !visible
                ? [0, 60, 60]
                : active
                  ? direction === 'backwards'
                    ? [60, 0, 0]
                    : [0, 0, 0]
                  : jumping && direction === 'backwards'
                    ? [60, 0, 0]
                    : [0, 0, 0],
              marginTop: -index * 16,
              '--lightness': visible ? `${30 - offset * 10}%` : 0,
              transition: {
                y: {
                  type: 'tween',
                  ease: 'easeOut',
                  duration: 0.5,
                  times: [0, 0.5, 1],
                },
                opacity: {
                  type: 'tween',
                  ease: 'easeOut',
                  duration: 0.7,
                  times: [0, 0.333, 1],
                },
                scale: {
                  type: 'tween',
                  ease: 'easeOut',
                  duration: 0.5,
                },
                delayChildren: 0.3,
              },
            },
          }}
          style={{
            zIndex: totalItems - index,
            // backgroundColor: `hsl(0 0% var(--lightness))`,
          }}
        >
          <BrowserWindow
            withChrome={active}
            withStack={false}
            className={cn(
              'p-0! rounded-lg! overflow-hidden',
              !active
                ? 'bg-glass bg-zinc-950/40 backdrop-blur-lg transition duration-500'
                : 'bg-black',
            )}
          >
            {/* TODO: need to add these somewhere
            [&::-webkit-scrollbar {
                height: 5px;
                width: 5px;
                background: var(--background);
              }
              
              ::-webkit-scrollbar-thumb {
                background: var(--accent);
                -webkit-border-radius: 1ex;
              }
              
              ::-webkit-scrollbar-corner {
                background: var(--background);
              } */}
            <motion.div
              className={cn(
                'mt-14 grid overflow-y-auto overflow-x-hidden bg-black pt-8 max-lg:max-h-[480px] max-lg:grid-cols-1 lg:h-[680px] lg:grid-cols-12',
                active ? 'dark:bg-zinc-950! bg-black' : '',
              )}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    delayChildren: 0.3,
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate={active ? 'visible' : undefined}
            >
              <div className="lg:order-2 lg:col-span-6 xl:col-span-7">
                {image && (
                  <FadeIn className="ml-auto mr-0 h-auto max-lg:order-1 max-lg:ml-4 lg:absolute lg:-bottom-0 lg:right-0 lg:top-auto lg:w-1/2 xl:w-7/12">
                    <picture>
                      {mobileImage && (
                        <Image
                          id={mobileImage.image.id}
                          asset={mobileImage.image}
                          // width={768}
                          // height={680}
                          as={Source}
                          media="(max-width: 1023px)"
                          queryParams={{
                            q: 100,
                          }}
                          mode="contain"
                          className="h-auto w-auto object-contain"
                        />
                      )}
                      {image && (
                        <Image
                          id={image.image.id}
                          asset={image.image}
                          width={768}
                          height={680}
                          // loading="eager"
                          queryParams={{
                            q: 100,
                          }}
                          // as="source"
                          mode="contain"
                          className="ml-auto h-full w-auto object-contain"
                        />
                      )}
                    </picture>
                  </FadeIn>
                )}
              </div>
              <div className="px-6 pb-12 max-lg:order-2 max-lg:pt-12 lg:col-span-6 lg:px-16 xl:col-span-5">
                <div className="space-y-6">
                  {title && (
                    <FadeIn>
                      <Heading className="text-background dark:text-foreground">
                        {title}
                      </Heading>
                    </FadeIn>
                  )}
                  {description && (
                    <FadeIn>
                      <div className="text-lg font-light text-zinc-500">
                        <PortableText portableText={description} />
                      </div>
                    </FadeIn>
                  )}
                  {features && (
                    <ul className="space-y-4">
                      {features.map((feature) => (
                        <li key={feature._key}>
                          <FadeIn>
                            <span className="flex">
                              <CircleCheckBigIcon className="mr-2 mt-1 h-4 w-4 shrink-0 text-primary" />
                              <span className="text-background dark:text-foreground">
                                {feature.name && (
                                  <strong className="text-primary">
                                    {feature.name}.{' '}
                                  </strong>
                                )}
                                {feature.description}
                              </span>
                            </span>
                          </FadeIn>
                        </li>
                      ))}
                    </ul>
                  )}
                  {url && (
                    <FadeIn>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-nowrap items-center rounded-full bg-white px-4 py-2 text-sm text-foreground transition hover:scale-95 dark:text-background"
                      >
                        Visit website
                        <ExternalLinkIcon className="ml-2 h-4 w-4" />
                      </a>
                    </FadeIn>
                  )}
                </div>
              </div>
            </motion.div>
          </BrowserWindow>
        </motion.div>
      </TabsContent>
    );
  },
);
