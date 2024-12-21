import { useEffect, useMemo, useRef, useState } from "react";
import { Navbar, NavbarItem, NavbarSection } from "./ui/navbar";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useAnimate,
  usePresence,
  LayoutGroup,
} from "motion/react";
import { useMeasure } from "@uidotdev/usehooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import BrowserWindow from "./BrowserWindow";
import { cn } from "~/utils/misc";

interface Props {
  data: {
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

export const ProjectCarousel = ({ data }: Props) => {
  // extract client names to use as tab buttons
  const clients = data.map((project) => project.client);

  const count = useMemo(() => clients.length, [clients.length]);

  // keep track of the active project
  const [active, setActive] = useState(clients[0]);
  const activeIndex = clients.indexOf(active);

  // switch statement to determine the active tab
  // const activeTab = useMemo(() => {
  //   switch (activeIndex) {
  //     case 0: {
  //       return
  //     }
  //   }
  // }, [activeIndex]);

  // const tabs = useMemo(() => {
  //   return data.map((project, index: number) => {
  //     const { client } = project;

  //     const isActive = index === activeIndex;

  //     const offset = index - activeIndex; // Distance from the active card

  //     const y = offset * -12; // Vertical offset for inactive cards
  //     const zIndex = -Math.abs(offset) + count; // Stack order
  //     const scale = offset > 0 ? 1 - Math.abs(offset) * 0.05 : 1; // Scale for inactive cards
  //     // console.log({ offset, y, zIndex, scale });

  //     return (
  //       <TabsContent
  //         asChild
  //         key={client}
  //         value={client}
  //         forceMount
  //         onClick={() => setActive(client)}
  //       >
  //         <motion.div
  //           // layoutId="active-tab"
  //           initial={{
  //             y,
  //             zIndex,
  //             // scale,
  //           }}
  //           // animate={{
  //           //   scale: [null, 1],
  //           // }}
  //           // animate={{
  //           //   y: [y, 20],
  //           //   opacity: [
  //           //     index < activeIndex ? 0 : 1,
  //           //     index < activeIndex ? 1 : 0,
  //           //   ],
  //           //   // scale: [scale, 1],
  //           // }}
  //           className={cn(
  //             `group absolute inset-0 origin-top`,
  //             isActive
  //               ? ""
  //               : index < activeIndex
  //                 ? "pointer-events-none"
  //                 : "cursor-pointer"
  //           )}
  //           style={{
  //             scale,
  //             opacity: isActive ? 1 : index < activeIndex ? 0 : 1,
  //           }}
  //           // animate={{
  //           //   y:
  //           //     !isActive && index < activeIndex
  //           //       ? 50
  //           //       : !isActive && index > activeIndex
  //           //         ? undefined
  //           //         : offset * -12,
  //           //   // scale: isActive ? 1 : 1 - Math.abs(offset) * 0.1,
  //           //   opacity: isActive ? 1 : index < activeIndex ? 0 : 1,
  //           //   zIndex: -Math.abs(offset) + 10,
  //           // }}
  //           // exit={{
  //           //   y: offset * 20,
  //           //   // scale: isActive ? 1 : 1 - Math.abs(offset) * 0.1,
  //           //   opacity: 0,
  //           //   zIndex: -Math.abs(offset) + 10,
  //           // }}
  //           // transition={{
  //           //   type: "spring",
  //           //   stiffness: 300,
  //           //   damping: 50,
  //           // }}
  //         >
  //           <BrowserWindow
  //             stacked={false}
  //             className={`min-h-[600px] ${!isActive ? "backdrop-blur-lg transition bg-black/30 !bg-none group-hover:bg-primary" : "bg-black !bg-[radial-gradient(circle,rgba(255,255,255,.05)_10%,black_75%)]"}`}
  //           >
  //             <span className="text-white">{client}</span>
  //           </BrowserWindow>
  //         </motion.div>
  //       </TabsContent>
  //     );
  //   });
  // }, [activeIndex, clients, count]);

  return (
    <div id="featured-projects" className="w-full h-full">
      <Tabs
        defaultValue={clients[0]}
        value={active}
        onValueChange={(value) => setActive(value)}
      >
        <TabsList>
          {clients.map((client, index: number) => {
            return (
              <TabsTrigger
                key={client}
                value={client}
                active={client === active}
              >
                {client}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="mt-16 relative">
          <LayoutGroup>
            {data.map((project, index: number) => {
              return (
                <Project
                  project={project}
                  key={index}
                  zIndex={count - index}
                  index={index}
                  activeIndex={activeIndex}
                  setActive={setActive}
                />
              );
            })}
          </LayoutGroup>
        </div>
      </Tabs>
      {/* <Navbar>
        <NavbarSection className="relative">

          {clients.map((client, i: number) => (
            <NavbarItem
              ref={active === client ? currentRef : hoveredRef}
              id={`featured-projects-${client}`}
              key={i}
              // href={`#featured-projects-${client}`}
              // activeX={x.get()}
              // hoveredX={hoveredX.get()}
              active={active === client}
              onClick={() => setActive(client)}
              // onMouseEnter={() => {
              //   setHovered(true);
              // }}
              // onMouseLeave={() => {
              //   setHovered(false);
              // }}
            >
              {client}
            </NavbarItem>
          ))}
        </NavbarSection>
      </Navbar> */}
    </div>
  );
};

const Project = ({
  project,
  index,
  activeIndex,
  zIndex,
  setActive,
}: {
  project: {
    client: string;
    url: string;
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
    keyFeatures: string[];
  };
  index: number;
  activeIndex: number;
  zIndex: number;
  setActive: (value: string) => void;
}) => {
  const [scope, animate] = useAnimate();

  const { client } = project;

  const isActive = index === activeIndex;
  const isVisible = index >= activeIndex;

  const offset = index - activeIndex; // Distance from the active card

  const y = (index + 1) * -12; // Vertical offset for inactive cards
  // Scale for inactive cards
  const opacity = isVisible ? 1 : 0;
  // console.log({ offset, y, zIndex, scale });

  const scale = offset > 0 ? 1 - Math.abs(offset) * 0.05 : 1;

  // useEffect(() => {
  //   if (isActive) {
  //     const animation = async () => {
  //       await animate(
  //         scope.current,
  //         { opacity: 1, scale: 1 },
  //         { duration: 0.5 }
  //       );
  //       // await animate(scope.current, { opacity: 1 });
  //     };
  //     animation();
  //   } else if (isVisible) {
  //     const animation = async () => {
  //       await animate(scope.current, { opacity: 1, scale });
  //       // await animate(scope.current, { opacity: 1 });
  //     };
  //     animation();
  //   } else {
  //     const animation = async () => {
  //       await animate(scope.current, { opacity: 0, scale: 1 });
  //       // await animate(scope.current, { opacity: 1 });
  //     };
  //     animation();
  //   }
  // }, [isActive, isVisible]);

  return (
    <TabsContent
      asChild
      value={client}
      forceMount
      onClick={() => setActive(client)}
    >
      <motion.div
        // layoutId="active-tab"
        layout
        // ref={scope}
        // layout
        initial={{
          y: 0,
          zIndex,
          scale: 1 - Math.abs(index) * 0.02,
        }}
        animate={{
          y: isVisible ? y : 20,
          scale,
          opacity,
        }}
        transition={{
          // duration: 0.5,
          y: { delay: !isActive ? index * 0.1 : 0, duration: 0.5 },
          scale: {
            delay: isVisible ? index * 0.1 : 0,
            type: "spring",
            stiffness: 300,
            damping: 50,
            // type: "tween",
            duration: 0.5,
          },
          opacity: {
            delay: !isVisible ? index * 0.1 : 0,
            duration: !isActive ? 0.5 : 0,
          },
          // opacity: {
          //   delay: index * 0.1,
          //   duration: 0.5,
          // },
        }}
        whileInView="animate"
        viewport={{ once: true, amount: 1 }}
        // animate={{
        //   scale: [offset > 0 ? 1 - Math.abs(offset) * 0.05 : 1, 1],
        //   transition: {
        //     type: "spring",
        //     stiffness: 300,
        //     damping: 50,
        //     restDelta: 0.01,
        //   },
        // }}
        // animate={{
        //   y: [y, 20],
        //   opacity: [
        //     index < activeIndex ? 0 : 1,
        //     index < activeIndex ? 1 : 0,
        //   ],
        //   // scale: [scale, 1],
        // }}
        className={cn(
          `tab group absolute inset-0 origin-top bg-black`,
          isActive
            ? ""
            : index < activeIndex
              ? "pointer-events-none"
              : "cursor-pointer"
        )}
        style={{ y, scale, opacity }}
        // transition={{
        //   duration: 1,
        //   ease: "easeOut",
        // }}
        // style={{
        //   scale,
        //   opacity: isActive ? 1 : index < activeIndex ? 0 : 1,
        // }}
        // animate={{
        //   y:
        //     !isActive && index < activeIndex
        //       ? 50
        //       : !isActive && index > activeIndex
        //         ? undefined
        //         : offset * -12,
        //   // scale: isActive ? 1 : 1 - Math.abs(offset) * 0.1,
        //   opacity: isActive ? 1 : index < activeIndex ? 0 : 1,
        //   zIndex: -Math.abs(offset) + 10,
        // }}
        // exit={{
        //   y: offset * 20,
        //   // scale: isActive ? 1 : 1 - Math.abs(offset) * 0.1,
        //   opacity: 0,
        //   zIndex: -Math.abs(offset) + 10,
        // }}
        // transition={{
        //   type: "spring",
        //   stiffness: 300,
        //   damping: 50,
        // }}
      >
        <BrowserWindow
          stacked={false}
          className={`min-h-[600px] ${!isActive ? "backdrop-blur-lg transition bg-black/30 !bg-none group-hover:bg-black/40 group-hover:border-zinc-300 group-hover:-translate-y-1" : "bg-black !bg-[radial-gradient(circle,rgba(255,255,255,.05)_10%,black_75%)]"}`}
        >
          <span className="text-white">{client}</span>
        </BrowserWindow>
      </motion.div>
    </TabsContent>
  );
};
