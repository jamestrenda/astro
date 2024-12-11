import { LightbulbIcon, LightbulbOffIcon } from "lucide-react";
import { cn } from "~/utils/misc";
import { ThemeFormSchema, type Theme } from "~/utils/theme";
import { useForm, getFormProps } from "@conform-to/react";
import { getZodConstraint } from "@conform-to/zod";
import type { z } from "zod";
import { useTheme } from "~/utils/hooks/useTheme";

export function ThemeToggle({ initial }: { initial: Theme | undefined }) {
  const { theme, setTheme } = useTheme({ initial });

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
          value={theme === "light" ? "dark" : "light"}
          className={cn(
            `border-4 border-solid border-black rounded-full bg-foreground dark:bg-black ring-brand text-primary h-9 w-16 grid place-items-center text-white dark:text-background`
          )}
        >
          <div
            className={cn(
              "flex w-full",
              theme === "dark" ? "justify-start" : "justify-end"
            )}
          >
            {theme === "light" ? (
              <LightbulbIcon
                className={cn("h-7 w-7 p-1 rounded-full bg-primary")}
                strokeWidth={2}
                key="light"
              />
            ) : (
              <LightbulbOffIcon
                className={cn("h-7 w-7 p-1 rounded-full bg-primary")}
              />
            )}
            <span className="sr-only">{`Toggle ${theme === "light" ? "dark" : "light"} mode`}</span>
          </div>
        </button>
      </form>
    </div>
  );
}
