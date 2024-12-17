import { useEffect, useRef, useState } from "react";
import { Navbar, NavbarItem, NavbarSection } from "./ui/navbar";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { useMeasure } from "@uidotdev/usehooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import BrowserWindow from "./BrowserWindow";

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
  const clients = data.map((project) => project.client);
  const [active, setActive] = useState(clients[0]);
  const activeIndex = clients.indexOf(active);

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
          {clients.map((client, index: number) => {
            // Determine position and styling of cards based on their index
            const offset = index - activeIndex; // Distance from the active card
            const isActive = index === activeIndex;

            return (
              <TabsContent
                asChild
                key={client}
                value={client}
                forceMount
                onClick={() => setActive(client)}
                // style={
                //   {
                //     // opacity: `${client === active ? 1 : 0.5}`,
                //   }
                // }
              >
                <motion.div
                  className={`w-full group h-full absolute top-0 inset-x-0 ${isActive ? "" : index < activeIndex ? "pointer-events-none" : "cursor-pointer"}`}
                  initial={{
                    y: offset * -12, // Vertical offset for inactive cards
                    // scale: isActive ? 1 : 1 - Math.abs(offset) * 0.1, // Scale inactive cards
                    zIndex: -Math.abs(offset) + 10, // Stack order
                  }}
                  animate={{
                    y:
                      !isActive && index < activeIndex
                        ? 50
                        : !isActive && index > activeIndex
                          ? undefined
                          : offset * -12,
                    // scale: isActive ? 1 : 1 - Math.abs(offset) * 0.1,
                    opacity: isActive ? 1 : index < activeIndex ? 0 : 1,
                    zIndex: -Math.abs(offset) + 10,
                  }}
                  // exit={{
                  //   y: offset * 20,
                  //   // scale: isActive ? 1 : 1 - Math.abs(offset) * 0.1,
                  //   opacity: 0,
                  //   zIndex: -Math.abs(offset) + 10,
                  // }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 1.5,
                    // staggerChildren: 0.5,
                  }}
                >
                  <motion.div
                    initial={{
                      marginLeft: offset * 16,
                      marginRight: offset * 16,
                    }}
                    animate={{
                      marginLeft: offset * 16,
                      marginRight: offset * 16,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <BrowserWindow
                      stacked={false}
                      className={`min-h-[600px] ${!isActive ? "backdrop-blur-lg transition bg-black/30 !bg-none group-hover:bg-primary" : "bg-black !bg-[radial-gradient(circle,rgba(255,255,255,.05)_10%,black_75%)]"}`}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: 10,
                            }}
                            className="text-white"
                          >
                            {client}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </BrowserWindow>
                  </motion.div>
                </motion.div>
              </TabsContent>
            );
          })}
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
