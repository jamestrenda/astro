import { LightbulbIcon, LightbulbOffIcon } from "lucide-react";
import { ThemeFormSchema, type Theme } from "~/utils/theme";
import { useForm, getFormProps } from "@conform-to/react";
import { getZodConstraint } from "@conform-to/zod";
import type { z } from "zod";
import { useTheme } from "~/utils/hooks/useTheme";
import { motion } from "motion/react";
import { cn } from "~/utils/misc";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export function ThemeToggle({ initial }: { initial: Theme | undefined }) {
  // TODO: check for isClient
  const { isDark, setTheme } = useTheme(initial);

  const [form] = useForm({
    constraint: getZodConstraint(ThemeFormSchema),
    onSubmit: async (e, { formData }) => {
      e.preventDefault();

      const response = await fetch("/api/theme", {
        method: "POST",
        body: formData,
      });
      const data: z.infer<typeof ThemeFormSchema> = await response.json();
      setTheme(data.theme);
    },
  });

  return (
    <div className="starting:opacity-0 starting:-translate-y-2 transition duration-500">
      <form {...getFormProps(form)} className="grid place-items-center">
        <button
          type="submit"
          name="theme"
          value={isDark ? "light" : "dark"}
          className={cn(
            "border-4 border-solid border-black dark:border-primary rounded-full bg-foreground dark:bg-primary ring-brand text-primary h-9 max-md:w-9 w-16 grid place-items-center text-white dark:text-background",
            isDark ? "justify-start" : "justify-end"
          )}
        >
          <motion.div
            layout
            transition={spring}
            whileHover={{
              scale: 1.1,
            }}
          >
            {isDark ? (
              <LightbulbOffIcon className="h-7 w-7 p-1 rounded-full bg-white shadow-sm " />
            ) : (
              <LightbulbIcon
                className="h-7 w-7 p-1 rounded-full bg-primary shadow-sm "
                strokeWidth={2}
                key="light"
              />
            )}
            <span className="sr-only">{`Toggle ${isDark ? "light" : "dark"} mode`}</span>
          </motion.div>
        </button>
      </form>
    </div>
  );
}
