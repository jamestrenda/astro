import { LaptopMinimal, MoonStarIcon, SunMediumIcon } from "lucide-react";
import { cn } from "~/utils/misc";
import { ThemeFormSchema, type Theme } from "~/utils/theme";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { getZodConstraint } from "@conform-to/zod";
import { useEffect, useState } from "react";
import type { z } from "zod";
import { useMediaQuery } from "@uidotdev/usehooks";

export function ThemeToggle({ theme }: { theme: Theme }) {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (currentTheme === "dark" || (currentTheme === "system" && prefersDark)) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (currentTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("light");
    }
  }, [currentTheme, prefersDark]);

  const [formLight, fieldsLight] = useForm({
    id: "light",
    constraint: getZodConstraint(ThemeFormSchema),
    onSubmit: async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch("/api/theme", {
        method: "POST",
        body: formData,
      });
      const data: z.infer<typeof ThemeFormSchema> = await response.json();
      setCurrentTheme(data.theme);
    },
  });
  const [formDark, fieldsDark] = useForm({
    id: "dark",
    constraint: getZodConstraint(ThemeFormSchema),
    onSubmit: async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch("/api/theme", {
        method: "POST",
        body: formData,
      });
      const data: z.infer<typeof ThemeFormSchema> = await response.json();
      setCurrentTheme(data.theme);
    },
  });
  const [formSystem, fieldsSystem] = useForm({
    id: "system",
    constraint: getZodConstraint(ThemeFormSchema),
    onSubmit: async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch("/api/theme", {
        method: "POST",
        body: formData,
      });
      const data: z.infer<typeof ThemeFormSchema> = await response.json();
      setCurrentTheme(data.theme);
    },
  });

  return (
    <div className="flex items-center border border-solid border-black rounded-full">
      <form {...getFormProps(formLight)} className="grid place-items-center">
        <button
          className={cn(
            `ring-brand text-primary h-7 w-7 grid place-items-center rounded-full`,
            currentTheme === "light" ? "bg-primary text-white" : ""
          )}
          disabled={currentTheme === "light"}
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
            `ring-brand text-primary h-7 w-7 grid place-items-center rounded-full`,
            currentTheme === "dark" ? "bg-foreground dark:bg-black" : ""
          )}
          disabled={currentTheme === "dark"}
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
      <form {...getFormProps(formSystem)} className="grid place-items-center">
        <button
          className={cn(
            `ring-brand text-primary h-7 w-7 grid place-items-center rounded-full`,
            currentTheme === "system"
              ? "bg-primary text-white dark:bg-black dark:text-primary"
              : ""
          )}
          disabled={currentTheme === "system"}
        >
          <input
            value="system"
            {...getInputProps(fieldsSystem.theme, {
              type: "hidden",
              value: false,
            })}
          />
          <LaptopMinimal className="h-4 w-4" />
          <span className="sr-only">System Theme</span>
        </button>
      </form>
    </div>
  );
}
