import { MoonStarIcon, SunMediumIcon } from "lucide-react";
import { cn } from "~/utils/misc";
import { ThemeFormSchema, type Theme } from "~/utils/theme";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { getZodConstraint } from "@conform-to/zod";
import type { z } from "zod";
import { useTheme } from "~/utils/hooks/useTheme";

export function ThemeToggle({ initial }: { initial: Theme | undefined }) {
  const { theme, setTheme } = useTheme({ initial });
  const isDark = theme === "dark";

  const [formLight, fieldsLight] = useForm({
    constraint: getZodConstraint(ThemeFormSchema),
    onSubmit: async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch("/api/theme", {
        method: "POST",
        body: formData,
      });
      const data: z.infer<typeof ThemeFormSchema> = await response.json();
      setTheme(data.theme);
    },
  });
  const [formDark, fieldsDark] = useForm({
    constraint: getZodConstraint(ThemeFormSchema),
    onSubmit: async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch("/api/theme", {
        method: "POST",
        body: formData,
      });
      const data: z.infer<typeof ThemeFormSchema> = await response.json();
      setTheme(data.theme);
    },
  });

  return (
    <div className="flex items-center border-4 border-solid border-black rounded-full bg-foreground dark:bg-background starting:opacity-0 starting:-translate-y-2 transition duration-500">
      <form {...getFormProps(formLight)} className="grid place-items-center">
        <button
          className={cn(
            `ring-brand text-primary h-7 w-7 grid place-items-center rounded-full disabled:cursor-not-allowed bg-primary text-white dark:bg-transparent`
          )}
          disabled={!isDark}
        >
          <input
            value="light"
            {...getInputProps(fieldsLight.theme, {
              type: "hidden",
              value: false,
            })}
          />
          <SunMediumIcon className={cn("h-4 w-4")} />
          <span className="sr-only">Light Theme</span>
        </button>
      </form>
      <form {...getFormProps(formDark)} className="grid place-items-center">
        <button
          className={cn(
            `ring-brand text-background dark:text-background h-7 w-7 grid place-items-center rounded-full disabled:cursor-not-allowed dark:bg-primary`
          )}
          disabled={isDark}
        >
          <input
            value="dark"
            {...getInputProps(fieldsDark.theme, {
              type: "hidden",
              value: false,
            })}
          />
          <MoonStarIcon className="h-4 w-4" />
          <span className="sr-only">Dark Theme</span>
        </button>
      </form>
    </div>
  );
}
