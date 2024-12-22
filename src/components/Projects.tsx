import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "~/utils/misc";
import { FadeIn } from "./FadeIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Container } from "./Container";
import { Overline } from "./Overline";
import BrowserWindow from "./BrowserWindow";
import { useMeasure } from "@uidotdev/usehooks";

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
          className="flex flex-col gap-8 w-full"
        >
          {/* Tab buttons */}
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
          <div className="relative w-full max-w-7xl mx-auto">
            {/* {data.map(({ id }, index) => (
              <Box
                key={id}
                id={id}
                active={index === activeIndex}
                visible={index >= activeIndex}
                offset={activeIndex - index}
                zIndex={data.length - index}
                onClick={handleActiveTab}
                activeIndex={activeIndex}
                prevIndex={prevIndex}
              />
            ))} */}
            {/* These will represent tab content */}

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
  client,
  active,
  visible,
  zIndex,
  offset,
  onClick,
  activeIndex,
  prevIndex,
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

  return (
    <TabsContent asChild value={id} forceMount onClick={() => onClick(id)}>
      <motion.div
        ref={ref}
        className={cn(
          "group absolute top-16 inset-x-0",
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
          // boxShadow: `0 0 10px -15px rgba(0,0,0,.3)`,
        }}
        whileInView="animate"
        viewport={{ once: true }}
        animate={{
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
          // boxShadow: `0 -10px 10px -15px rgba(0,0,0,.3)`,
          // "--lightness": visible ? `${100 - Math.abs(offset) * 10}%` : 100,
        }}
        transition={{
          opacity: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
            times: [0, 0.5, 1],
          },
          scale: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
            times: [0, 0.5, 1],
          },
          boxShadow: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
            delay: active ? 0 : Math.abs(offset) * 0.05,
          },
        }}
        style={{
          zIndex,
          // backgroundColor: `hsla(0 0% var(--lightness) / 1)`,
        }}
      >
        <BrowserWindow
          withStack={false}
          className={`min-h-[600px] ${!active ? "backdrop-blur-lg transition bg-black/30 !bg-none group-hover:bg-black/40 group-hover:border-zinc-300 group-hover:-translate-y-1" : "bg-black !bg-[radial-gradient(circle,rgba(255,255,255,.05)_10%,black_75%)]"}`}
        >
          <FadeIn
            variants={{
              initial: { y: 20, opacity: 0 },
              animate: {
                opacity: active ? 1 : 0,
                y: active ? 0 : undefined,
                transition: { duration: 0.5, delay: 0.5 },
              },
            }}
          >
            <span className="text-white">{client}</span>
          </FadeIn>
        </BrowserWindow>
      </motion.div>
    </TabsContent>
  );
};
