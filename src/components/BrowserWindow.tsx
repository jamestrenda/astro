import { cn } from "~/utils/misc";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  stacked?: boolean;
}

const BrowserWindow = ({ className, stacked = true, children }: Props) => {
  return (
    <div className="browser-window flex flex-col md:h-full relative">
      {stacked && (
        <div className="absolute top-full w-full">
          <div className="z-10 absolute top-auto -bottom-[60px] w-full">
            <div className="bg-black/5 backdrop-blur-lg h-24 rounded-lg mx-20" />
          </div>
          <div className="z-10 absolute inset-0 top-auto -bottom-[48px] w-full">
            <div className="bg-black/20 backdrop-blur-lg h-24 rounded-lg mx-16" />
          </div>
          <div className="z-10 absolute inset-0 top-auto -bottom-[36px] w-full">
            <div className="bg-black/40 backdrop-blur-lg h-24 rounded-lg mx-12" />
          </div>
          <div className="z-10 absolute inset-0 top-auto -bottom-[24px] w-full">
            <div className="bg-black/50 backdrop-blur-lg h-24 rounded-lg mx-8" />
          </div>
          <div className="z-10 absolute inset-0 top-auto -bottom-[12px] w-full">
            <div className="bg-black/50 backdrop-blur-lg h-24 rounded-lg mx-4" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "z-20 pt-14 bg-black/90 bg-[size:150%] bg-[position:90%] bg-[radial-gradient(circle,hsla(var(--primary-dark)/.7),black_75%)] lg:bg-[radial-gradient(circle,hsla(var(--primary-dark)/.7)_10%,black_50%)] dark:bg-[radial-gradient(circle,hsla(var(--primary-dark)/.7),hsl(0 0% 10%)_75%)] rounded-lg w-full h-full  p-6 sm:p-16 grid items-center",
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
