import { forwardRef, useRef, useState, type ComponentProps } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionTemplate,
  MotionValue,
} from "motion/react";
import { cn } from "~/utils/misc";
import { FadeIn } from "./FadeIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Container } from "./Container";
import { Overline } from "./Overline";
import BrowserWindow from "./BrowserWindow";
import { useMeasure } from "@uidotdev/usehooks";
import { Heading } from "./Heading";
import { CheckCircle2Icon } from "lucide-react";
import { FadeInStaggerChildren } from "./FadeInStaggerChildren";

interface Props {
  data: {
    id: string;
    client: string;
    url: string;
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
    keyFeatures: string[];
  }[];
}

export const Projects = ({ data }: Props) => {
  const [activeTab, setActiveTab] = useState(data[0].id);
  const activeIndex = data.findIndex(({ id }) => id === activeTab);
  const [prevIndex, setPrevIndex] = useState<number>(activeIndex);

  // const target = useRef(null);
  // const { scrollYProgress } = useScroll({ target });

  // useMotionValueEvent(scrollYProgress, "change", (l) => {
  //   const totalItems = data.length;

  //   const index = Math.min(Math.floor(l * totalItems), totalItems - 1);
  //   if (index !== activeIndex) {
  //     handleActiveTab(data[index].id);
  //   }
  // });

  const handleActiveTab = (tab?: Props["data"][number]["id"]) => {
    setPrevIndex(activeIndex);
    setActiveTab(tab || data[activeIndex + 1]?.id || data[0].id);
  };

  return (
    <div className="bg-black bg-[radial-gradient(circle,rgba(255,255,255,.2),black_75%)] lg:aspect-[3/2] xl:aspect-video min-h-[600px] lg:min-h-[768px] w-full xl:max-h-[800px]">
      {/* <div
        className=" h-[50vh] w-full"
        style={
          {
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%);",
          } as React.CSSProperties
        }
      ></div> */}
      <Container
        // padding={false}
        className="flex flex-col items-center max-w-none pt-40"
      >
        <Overline className="">Featured Projecs</Overline>
        <Tabs
          defaultValue={data[0].id}
          value={activeTab}
          onValueChange={(value) => handleActiveTab(value)}
          // className="flex flex-col w-full sticky top-0 "
          className="flex flex-col w-full"
        >
          <TabsList
            // className="sticky top-0 z-50 bg-background py-4"
            className="py-4"
          >
            {data.map((project, index) => {
              const active = activeTab === project.id;
              return (
                <TabsTrigger
                  key={index}
                  value={project.id}
                  active={active}
                  className="text-background"
                >
                  {project.client}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <div
            // ref={target}
            className="w-full max-w-7xl mx-auto mt-10 relative"
            // style={{
            //   height: `calc(400vh)`,
            // }}
          >
            {data.map((project, index) => (
              <div
                key={project.id}
                // className="sticky"
                // style={{
                //   top: index * 16 + 20,
                //   zIndex: data.length - index,
                // }}
              >
                <Project
                  // ref={target}
                  // scrollProgress={scrollYProgress}
                  index={index}
                  totalItems={data.length}
                  onClick={handleActiveTab}
                  activeIndex={activeIndex}
                  prevIndex={prevIndex}
                  {...project}
                />
              </div>
            ))}
          </div>
        </Tabs>
      </Container>
    </div>
  );
};

const Project = forwardRef<
  HTMLDivElement,
  Omit<ComponentProps<"div">, "onClick"> &
    Props["data"][number] & {
      // scrollProgress: MotionValue<number>;
      index: number;
      activeIndex: number;
      prevIndex: number;
      totalItems: number;
      onClick: (id?: string) => void;
    }
>(
  (
    {
      id,
      index,
      onClick,
      activeIndex,
      prevIndex,
      // scrollProgress,
      totalItems,
      ...props
    },
    forwardedRef
  ) => {
    const [ref, { width }] = useMeasure();

    // const itemProgress = useTransform(
    //   scrollProgress,
    //   [index / totalItems, (index + 1) / totalItems],
    //   ["0%", "100%"]
    // );

    const active = index === activeIndex;
    const offset = activeIndex - index;
    const direction = activeIndex >= prevIndex ? "forwards" : "backwards";
    const visible = index >= activeIndex;
    const jumping = Math.abs(activeIndex - prevIndex) > 1;

    // TODO: needs work, jumping from 1 to 3 doesn't have the intended effect because it's offset has chanaged
    // and we need to account for it
    const scale =
      !visible && !jumping
        ? 1
        : 1 -
          ((width && 32 / width) || 0) *
            Math.abs(jumping && !active && !visible ? index : offset);

    const handleClick = () => {
      onClick(id);
    };

    const { client, title, description, image, keyFeatures, url } = props;

    return (
      <TabsContent
        ref={forwardedRef}
        asChild
        value={id}
        forceMount
        onClick={handleClick}
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
              "--lightness":
                visible && !active ? `50%` : `${Math.abs(offset) * 7}%`,
              transition: { duration: 0.3, ease: "easeOut" },
            },
            animate: {
              scale,
              opacity: !visible
                ? [1, 1, 0]
                : active && direction === "backwards"
                  ? [0, 0, 1]
                  : [1, 1, 1],
              y: !visible
                ? [0, 60, 60]
                : active && direction === "backwards"
                  ? [60, 0, 0]
                  : !active && jumping && index < prevIndex
                    ? [60, 0, 0]
                    : [0, 0, 0],
              marginTop: -id * 16,
              "--lightness": visible ? `${Math.abs(offset) * 7}%` : 0,
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
                  duration: 0.3,
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
              className="max-lg:grid max-lg:grid-cols-1 max-lg:max-h-[480px] max-lg:pt-32 overflow-y-auto overflow-x-hidden"
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
              {/* <motion.div
                className="absolute top-14 inset-x-0 h-1 z-50 bg-green-400 origin-left "
                style={{
                  transform: useMotionTemplate`scaleX(${itemProgress})`,
                }}
              /> */}
              <div className="grid lg:grid-cols-2 max-lg:order-2 px-6 pt-6 pb-12 lg:px-16 lg:py-32">
                <div className="space-y-6">
                  <FadeIn>
                    <Heading className="text-background">{title}</Heading>
                  </FadeIn>
                  <FadeIn>
                    <p className="text-muted">{description}</p>
                  </FadeIn>
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
                </div>
              </div>
              <FadeIn className="lg:absolute lg:bottom-0 lg:top-14 w-full lg:-right-[50%] h-auto max-lg:order-1 max-lg:-mr-16">
                <img
                  className="h-full w-auto object-contain"
                  src={image.src}
                  alt={image.alt}
                />
              </FadeIn>
            </motion.div>
          </BrowserWindow>
        </motion.div>
      </TabsContent>
    );
  }
);
