import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "~/utils/misc";

export const Basic = ({
  data,
}: {
  data: {
    id: number;
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
}) => {
  const [activeTab, setActiveTab] = useState(data[0].id);
  const activeIndex = data.findIndex(({ id }) => id === activeTab);

  return (
    <div className="flex flex-col gap-8">
      {/* These will represent tabs */}
      <div className="flex gap-4 justify-center">
        {data.map(({ id }, i) => (
          <Button
            key={id}
            id={id}
            active={activeTab === id}
            setActiveTab={() => setActiveTab(id)}
          />
        ))}
      </div>
      {/* These will represent tab content */}
      <div className="relative w-[600px] mx-auto">
        {data.map(({ id }, i) => (
          <Box
            key={id}
            id={id}
            active={activeTab === id}
            visible={id >= activeTab}
            offset={activeIndex - i}
            zIndex={data.length - i}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
    </div>
  );
};

const Box = ({
  id,
  active,
  visible,
  zIndex,
  offset,
  setActiveTab,
}: {
  id: number;
  active: boolean;
  visible: boolean;
  zIndex: number;
  offset: number;
  setActiveTab: (id: number) => void;
}) => {
  const inactiveTabScale = 1 - Math.abs(offset) * 0.1;
  return (
    <motion.div
      onClick={() => setActiveTab(id)}
      className={cn(
        "absolute top-16 inset-x-0",
        "p-6 w-[400px] bg-white h-64 mx-auto border border-solid shadow-[0_-5px_10px_-10px_rgba(0,0,0,.3)] grid place-items-center rounded-lg origin-top",
        !visible
          ? "pointer-events-none"
          : active
            ? "cursor-default"
            : "cursor-pointer"
      )}
      initial={false}
      animate={{
        scale: !visible ? 1 : inactiveTabScale,
        opacity: active || visible ? [0, 0, 1] : [1, 1, 0],
        y: !visible ? 30 : 0,
        // "--lightness": visible ? `${100 - Math.abs(offset) * 10}%` : 100,
        // "--opacity": active ? 1 : 0.8,
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
      }}
      style={{
        zIndex,
        marginTop: -id * 16,
        // backgroundColor: `hsla(0 0% var(--lightness) / 1)`,
      }}
    >
      {id}
    </motion.div>
  );
};

const Button = ({
  id,
  active,
  setActiveTab,
}: {
  id: number;
  active: boolean;
  setActiveTab: (id: number) => void;
}) => {
  return (
    <button
      className={cn("", active ? "underline" : "")}
      onClick={() => setActiveTab(id)}
    >
      {id}
    </button>
  );
};
