import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "~/utils/misc";
import { FadeIn } from "./FadeIn";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Container } from "./Container";
import { Overline } from "./Overline";

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

          {/* These will represent tab content */}
          {/* <div className="relative w-full max-w-4xl mx-auto">
        {data.map(({ id }, index) => (
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
        ))}
      </div> */}
        </Tabs>
      </Container>
    </div>
  );
};

const Box = ({
  id,
  active,
  visible,
  zIndex,
  offset,
  onClick,
  activeIndex,
  prevIndex,
}: {
  id: number;
  active: boolean;
  visible: boolean;
  zIndex: number;
  offset: number;
  activeIndex: number;
  prevIndex: number;
  onClick: (id: number) => void;
}) => {
  const inactiveTabScale = 1 - Math.abs(offset) * 0.1;
  const direction = activeIndex >= prevIndex ? "forwards" : "backwards";

  return (
    <motion.div
      onClick={() => onClick(id)}
      className={cn(
        "absolute top-16 inset-x-0",
        "p-6 w-full min-h-[600px] bg-white h-64 mx-auto grid place-items-center rounded-lg origin-top",
        !visible
          ? "pointer-events-none"
          : active
            ? "cursor-default"
            : "cursor-pointer"
      )}
      initial={{
        marginTop: 0,
        opacity: 1,
        boxShadow: `0 0 10px -15px rgba(0,0,0,.3)`,
      }}
      whileInView="animate"
      viewport={{ once: true }}
      animate={{
        scale: !visible ? 1 : inactiveTabScale,
        opacity: !visible
          ? [1, 0, 0]
          : active && direction === "backwards"
            ? [0, 1, 1]
            : [1, 1, 1],
        y: !visible ? 30 : 0,
        marginTop: -id * 16,
        boxShadow: `0 -10px 10px -15px rgba(0,0,0,.3)`,
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nihil
        aliquam harum numquam tempora voluptatem dolorem quos illum ipsa
        repellendus eius doloremque dolore sequi architecto aliquid fuga fugiat,
        iure delectus?
      </FadeIn>
    </motion.div>
  );
};

const Button = ({
  id,
  active,
  onClick,
}: {
  id: number;
  active: boolean;
  onClick: (id: number) => void;
}) => {
  return (
    <button
      className={cn("", active ? "underline" : "")}
      onClick={() => onClick(id)}
    >
      {id}
    </button>
  );
};
