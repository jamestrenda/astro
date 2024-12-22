import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "~/utils/misc";
import { FadeIn } from "./FadeIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Container } from "./Container";
import { Overline } from "./Overline";
import BrowserWindow from "./BrowserWindow";
import { useMeasure } from "@uidotdev/usehooks";
import { Heading } from "./Heading";
import { delay } from "rxjs";
import { CheckCircle2Icon } from "lucide-react";

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

  const handleActiveTab = (tab: Props["data"][number]["id"]) => {
    setPrevIndex(activeIndex);
    setActiveTab(tab);
  };
  return (
    <div>
      <Container
        padding={true}
        className="flex flex-col items-center min-h-screen"
      >
        <Overline>Featured Projecs</Overline>
        <Tabs
          defaultValue={data[0].id}
          value={activeTab}
          onValueChange={(value) => handleActiveTab(value)}
          className="flex flex-col gap-8 w-full mt-6"
        >
          <TabsList>
            {data.map((project, index) => {
              const active = activeTab === project.id;
              return (
                <TabsTrigger key={index} value={project.id} active={active}>
                  {project.client}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <div className="relative w-full max-w-7xl mx-auto mt-6">
            {data.map((project, index) => (
              <Project
                key={project.id}
                {...project}
                active={index === activeIndex}
                visible={index >= activeIndex}
                offset={activeIndex - index}
                zIndex={data.length - index}
                onClick={handleActiveTab}
                activeIndex={activeIndex}
                prevIndex={prevIndex}
              />
            ))}
          </div>
        </Tabs>
      </Container>
    </div>
  );
};

const Project = ({
  id,

  active,
  visible,
  zIndex,
  offset,
  onClick,
  activeIndex,
  prevIndex,
  ...props
}: Props["data"][number] & {
  active: boolean;
  visible: boolean;
  zIndex: number;
  offset: number;
  activeIndex: number;
  prevIndex: number;
  onClick: (id: string) => void;
}) => {
  const [ref, { width }] = useMeasure();
  const inactiveTabScale = 1 - ((width && 32 / width) || 0) * Math.abs(offset);
  const direction = activeIndex >= prevIndex ? "forwards" : "backwards";

  const { client, title, description, image, keyFeatures, url } = props;

  return (
    <TabsContent asChild value={id} forceMount onClick={() => onClick(id)}>
      <motion.div
        ref={ref}
        className={cn(
          "group absolute top-16 inset-x-0 rounded-lg",
          "w-full mx-auto origin-top",
          !visible
            ? "pointer-events-none"
            : active
              ? "cursor-default"
              : "cursor-pointer"
        )}
        initial={{
          marginTop: 0,
          opacity: 1,
        }}
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          animate: {
            scale: !visible ? 1 : inactiveTabScale,
            opacity: !visible
              ? [1, 1, 0]
              : active && direction === "backwards"
                ? [0, 1, 1]
                : [1, 1, 1],
            y: !visible
              ? [0, 60, 60]
              : active && direction === "backwards"
                ? [60, 0, 0]
                : [0, 0, 0],
            marginTop: -id * 16,
            "--lightness": visible ? `${Math.abs(offset) * 15}%` : 0,
            transition: {
              y: {
                type: "tween",
                ease: "easeOut",
                duration: 0.3,
                times: [0, 0.5, 1],
                // delay: active && direction === "backwards" ? 0.3 : 0,
              },
              opacity: {
                type: "tween",
                ease: "easeOut",
                duration: 0.2,
                times: [0, 0.75, 1],
                // delay: active && direction === "backwards" ? 0.3 : 0,
              },
              scale: {
                type: "tween",
                ease: "easeOut",
                duration: 0.3,
                times: [0, 0.5, 1],
                // delay: active && direction === "backwards" ? 0.3 : 0,
              },
              // delayChildren: 0.3,
              // staggerChildren: 0.3,
              // // staggerDirection: !visible ? -1 : 1,
            },
          },
        }}
        style={{
          zIndex,
          backgroundColor: `hsl(0 0% var(--lightness))`,
        }}
      >
        <BrowserWindow
          withStack={false}
          className={`min-h-[600px] ${!active ? "backdrop-blur-lg transition duration-500 bg-black/30 !bg-none group-hover:bg-black/40 group-hover:border-zinc-300 group-hover:-translate-y-1" : "bg-black !bg-[radial-gradient(circle,rgba(255,255,255,.05)_10%,black_75%)]"}`}
        >
          <div className="grid grid-cols-2">
            <div className="space-y-6">
              <Heading className="text-background">{title}</Heading>
              <p className="text-muted">{description}</p>
              <ul className="text-green-400 space-y-4">
                {keyFeatures.map((feature, index) => (
                  <li key={index} className="flex">
                    <CheckCircle2Icon className="mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <img
            className="absolute bottom-0 right-0 max-w-[50%] h-auto"
            src={image.src}
            alt={image.alt}
          />
        </BrowserWindow>
      </motion.div>
    </TabsContent>
  );
};

const fadeInVariants = (active: boolean, delay: number = 0) => ({
  initial: { y: 20, opacity: 0 },
  animate: {
    opacity: active ? 1 : 0,
    y: active ? 0 : undefined,
    transition: { duration: 0.3, delay },
  },
});
