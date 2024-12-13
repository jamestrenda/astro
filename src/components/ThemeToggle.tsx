import { LightbulbIcon, LightbulbOffIcon } from "lucide-react";
import { ThemeFormSchema, type Theme } from "~/utils/theme";
import { useForm, getFormProps } from "@conform-to/react";
import { getZodConstraint } from "@conform-to/zod";
import type { z } from "zod";
import { useTheme } from "~/utils/hooks/useTheme";

export function ThemeToggle({ initial }: { initial: Theme | undefined }) {
  const { isDark, setTheme } = useTheme({ initial });

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
          className="border-4 border-solid border-black dark:border-background rounded-full bg-foreground dark:bg-background ring-brand text-primary h-9 w-16 grid place-items-center text-white dark:text-background"
        >
          <div
            className={`flex w-full ${isDark ? "justify-start" : "justify-end"}`}
          >
            {isDark ? (
              <LightbulbOffIcon className="h-7 w-7 p-1 rounded-full bg-primary" />
            ) : (
              <LightbulbIcon
                className="h-7 w-7 p-1 rounded-full bg-primary"
                strokeWidth={2}
                key="light"
              />
            )}
            <span className="sr-only">{`Toggle ${isDark ? "light" : "dark"} mode`}</span>
          </div>
        </button>
      </form>
    </div>
  );
}
