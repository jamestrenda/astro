import { cn } from "~/utils/misc";
import { motion } from "motion/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  stacked?: boolean;
}

const BrowserWindow = ({ className, stacked = true, children }: Props) => {
  return (
    <div className="browser-window flex flex-col md:h-full relative rounded-b-lg">
      {stacked && (
        <div className="absolute top-full w-full">
          <motion.div
            className="z-10 absolute top-auto bottom-0 w-full"
            initial={{ bottom: 0 }}
            animate={{ bottom: -60 }}
            whileInView="animate"
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.05 * 10,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="bg-black/5 backdrop-blur-lg h-24 rounded-lg mx-20" />
          </motion.div>
          <motion.div
            className="z-10 absolute inset-0 top-auto bottom-0 w-full"
            initial={{ bottom: 0 }}
            animate={{ bottom: -48 }}
            whileInView="animate"
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.05 * 9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="bg-black/20 backdrop-blur-lg h-24 rounded-lg mx-16" />
          </motion.div>
          <motion.div
            className="z-10 absolute inset-0 top-auto bottom-0 w-full"
            initial={{ bottom: 0 }}
            animate={{ bottom: -36 }}
            whileInView="animate"
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.05 * 8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="bg-black/40 backdrop-blur-lg h-24 rounded-lg mx-12" />
          </motion.div>
          <motion.div
            className="z-10 absolute inset-0 top-auto bottom-0 w-full"
            initial={{ bottom: 0 }}
            animate={{ bottom: -24 }}
            whileInView="animate"
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.05 * 7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="bg-black/50 backdrop-blur-lg h-24 rounded-lg mx-8" />
          </motion.div>
          <motion.div
            className="z-10 absolute inset-0 top-auto bottom-0 w-full"
            initial={{ bottom: 0 }}
            animate={{ bottom: -12 }}
            whileInView="animate"
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.05 * 6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="bg-black/50 backdrop-blur-lg h-24 rounded-lg mx-4" />
          </motion.div>
        </div>
      )}
      <div
        className={cn(
          "z-20 pt-14 bg-black/90 bg-[size:150%] bg-[position:90%] bg-[radial-gradient(circle,hsla(var(--primary-dark)/.7),black_75%)] lg:bg-[radial-gradient(circle,hsla(var(--primary-dark)/.7)_10%,black_50%)] dark:bg-[radial-gradient(circle,hsla(var(--primary-dark)/.7),hsl(0 0% 10%)_75%)] rounded-lg max-md:rounded-bl-none w-full h-full p-6 sm:p-16 grid items-center",
          className
        )}
      >
        <div
          className={cn(
            "bg-glass absolute top-0 inset-x-0 z-30 h-14 rounded-t-lg grid items-center"
            // className
          )}
        >
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-glass dark:bg-white/10 rounded-full"></div>
              <div className="h-3 w-3 bg-glass dark:bg-white/10 rounded-full"></div>
              <div className="h-3 w-3 bg-glass dark:bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BrowserWindow;
