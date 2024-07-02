import {
  MonitorSmartphoneIcon,
  MoonStarIcon,
  SunMediumIcon,
} from "lucide-react";
import { cn } from "~/utils/misc";
import { ThemeFormSchema, type Theme } from "~/utils/theme";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { getZodConstraint } from "@conform-to/zod";
import { useState } from "react";

export function ThemeToggle({
  userPreference,
}: {
  userPreference?: Theme | null;
}) {
  const mode = userPreference ?? "system";
  const [currentTheme, setCurrentTheme] = useState(mode);
  const [nextTheme, setNextTheme] = useState(mode);

  const [form, fields] = useForm({
    id: "theme-toggle",
    constraint: getZodConstraint(ThemeFormSchema),
    onSubmit: async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch("/api/theme", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setCurrentTheme(data.result.payload.theme);
      setNextTheme(data.result.value.theme);
    },
  });

  return (
    <form {...getFormProps(form)}>
      <input
        value={nextTheme}
        {...getInputProps(fields.theme, { type: "hidden", value: false })}
      />
      <button className="ring-brand px-2 text-primary">
        {currentTheme === "light" ? (
          <SunMediumIcon className={cn("h-6 w-6")} />
        ) : currentTheme === "dark" ? (
          <MoonStarIcon className="h-6 w-6" />
        ) : (
          <MonitorSmartphoneIcon className="h-6 w-6" />
        )}
        <span className="sr-only">Change theme</span>
      </button>
    </form>
  );
}
