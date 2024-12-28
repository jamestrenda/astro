import { forwardRef, useCallback, useState, type ComponentProps } from "react";
import { motion } from "motion/react";
import { cn } from "~/utils/misc";
import { FadeIn } from "./FadeIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Container } from "./Container";
import { Overline } from "./Overline";
import BrowserWindow from "./BrowserWindow";
import { useMeasure } from "@uidotdev/usehooks";
import { Heading } from "./Heading";
import { CheckCircle2Icon } from "lucide-react";

interface Props {
  data: {
    id: string;
    client: string;
    url: string;
    title: string;
    description: string;
    image?: {
      src: string;
      alt: string;
    };
    keyFeatures?: string[];
  }[];
}

export const Projects = ({ data }: Props) => {
  const totalItems = data.length;
  const [activeTab, setActiveTab] = useState(data[0].id);
  const activeIndex = data.findIndex(({ id }) => id === activeTab);
  const [prevIndex, setPrevIndex] = useState<number>(activeIndex);
  const jumpCount = Math.abs(activeIndex - prevIndex);

  const direction = activeIndex >= prevIndex ? "forwards" : "backwards";

  const handleChange = useCallback(
    (tab?: Props["data"][number]["id"]) => {
      setPrevIndex(activeIndex);
      setActiveTab(tab || data[activeIndex + 1]?.id || data[0].id);
    },
    [activeIndex, data]
  );

  return (
    <div className="relative">
      <div className="bg-black bg-[radial-gradient(circle,rgba(255,255,255,.2),black_75%)] h-[480px] lg:h-[680px]"></div>
      <div className="absolute inset-x-0 top-24 lg:top-40">
        <Container className="max-w-none  flex flex-col  items-center">
          <Overline className="">Featured Projecs</Overline>
          <Tabs
            defaultValue={data[0].id}
            value={activeTab}
            onValueChange={handleChange}
            className="flex flex-col w-full"
          >
            <TabsList className="py-4">
              {data.map((project, index) => {
                return (
                  <TabsTrigger
                    key={index}
                    value={project.id}
                    active={activeTab === project.id}
                    className="text-background dark:text-foreground dark:data-[state=active]:text-background"
                  >
                    {project.client}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <div className="w-full max-w-7xl mx-auto mt-10 relative">
              {data.map((project, index) => {
                const active = activeTab === project.id;
                const inMiddle = 0 < index && index < totalItems - 1;

                return (
                  <div key={project.id}>
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
                      {...project}
                    />
                  </div>
                );
              })}
            </div>
          </Tabs>
        </Container>
      </div>
      <div className="h-80 bg-background"></div>
    </div>
  );
};

const Project = forwardRef<
  HTMLDivElement,
  Omit<ComponentProps<"div">, "onClick"> &
    Props["data"][number] & {
      index: number;
      active: boolean;
      jumping: boolean;
      visible: boolean;
      offset: number;
      direction: "forwards" | "backwards";
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
    forwardedRef
  ) => {
    const [ref, { width }] = useMeasure();

    // Scale down each container by 32px (16px on each side). e.g. at 1280px it would be 0.025 or 1 - 0.025 = 0.975.
    // I prefer to specify the scale based on pixels than to simply hardcode .975. This way it's easier to adjust
    // and it's more explicit.
    const widthScale = (width && 32 / width) || 0;

    const scale = !visible ? 1 : 1 - widthScale * offset;

    const { client, title, description, url, image, keyFeatures } = props;

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
            "group absolute top-16 inset-x-0 rounded-lg shadow-xl",
            "w-full mx-auto origin-top",
            !visible
              ? "pointer-events-none"
              : active
                ? "cursor-default"
                : "cursor-pointer"
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
              "--lightness": visible && !active ? `50%` : `${index * 7}%`,
              transition: { duration: 0.3, ease: "easeOut" },
            },
            animate: {
              scale,
              opacity: !visible
                ? [1, 1, 0]
                : active && direction === "backwards"
                  ? [0, 1, 1]
                  : [1, 1, 1],
              y: !visible
                ? [0, 60, 60]
                : active
                  ? direction === "backwards"
                    ? [60, 0, 0]
                    : [0, 0, 0]
                  : jumping && direction === "backwards"
                    ? [60, 0, 0]
                    : [0, 0, 0],
              marginTop: -index * 16,
              "--lightness": visible ? `${index * 7}%` : 0,
              transition: {
                y: {
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.5,
                  times: [0, 0.5, 1],
                },
                opacity: {
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.7,
                  times: [0, 0.333, 1],
                },
                scale: {
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.5,
                },
                delayChildren: 0.3,
              },
            },
          }}
          style={{
            zIndex: totalItems - index,
            backgroundColor: `hsl(0 0% var(--lightness))`,
          }}
        >
          <BrowserWindow
            withStack={false}
            className={cn(
              " overflow-hidden !p-0 !rounded-lg",
              !active
                ? "backdrop-blur-lg transition duration-500 bg-transparent !bg-none "
                : "bg-black !bg-[radial-gradient(circle,rgba(255,255,255,.05)_10%,black_75%)]"
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
              className="max-lg:grid max-lg:grid-cols-1 max-lg:max-h-[480px] lg:h-[680px] max-lg:pt-32 overflow-y-auto overflow-x-hidden"
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
              animate={active ? "visible" : undefined}
            >
              <div className="grid lg:grid-cols-2 max-lg:order-2 px-6 pt-6 pb-12 lg:px-16 lg:py-32">
                <div className="space-y-6">
                  <FadeIn>
                    <Heading className="text-background">{title}</Heading>
                  </FadeIn>
                  <FadeIn>
                    <p className="text-muted">{description}</p>
                  </FadeIn>
                  {keyFeatures && (
                    <ul className="text-green-400 space-y-4">
                      {keyFeatures.map((feature, index) => (
                        <li key={index}>
                          <FadeIn>
                            <span className="flex">
                              <CheckCircle2Icon className="mr-2" />
                              {feature}
                            </span>
                          </FadeIn>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <FadeIn className="lg:absolute lg:bottom-0 lg:top-14 w-full lg:-right-[50%] h-auto max-lg:order-1 max-lg:-mr-16">
                {image && (
                  <img
                    className="h-full w-auto object-contain"
                    src={image.src}
                    alt={image.alt}
                  />
                )}
              </FadeIn>
            </motion.div>
          </BrowserWindow>
        </motion.div>
      </TabsContent>
    );
  }
);
