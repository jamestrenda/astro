import type { AstroCookies } from "astro";
import { z } from "zod";

export const themeCookieName = "__theme";
export type Theme = "light" | "dark" | "system";

export const ThemeFormSchema = z.object({
  theme: z.enum(["system", "light", "dark"]),
});

export function getTheme(cookies: AstroCookies): Theme {
  const parsed = cookies.get(themeCookieName)?.value ?? "system";
  return parsed as Theme;
}

export function setTheme(theme: Theme | "system", cookies: AstroCookies) {
  if (theme === "system") {
    return cookies.set(themeCookieName, "", { path: "/", maxAge: -1 });
  } else {
    return cookies.set(themeCookieName, theme, { path: "/", maxAge: 31536000 });
  }
}
