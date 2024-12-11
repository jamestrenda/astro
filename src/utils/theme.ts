import type { AstroCookies } from "astro";
import { z } from "zod";
import { themeCookieName } from "~/pages/api/theme";

const ThemeSchema = z.union([z.literal("light"), z.literal("dark")]);

export const ThemeFormSchema = z.object({
  theme: ThemeSchema,
});

export type Theme = z.infer<typeof ThemeSchema>;

export function getTheme(cookies: AstroCookies): Theme {
  const parsed = cookies.get(themeCookieName)?.value;
  return parsed as Theme;
}

export function getDarkMode(cookies: AstroCookies) {
  const parsed = cookies.get(themeCookieName)?.value === "dark";
  return parsed;
}

export function setTheme(theme: Theme, cookies: AstroCookies) {
  return cookies.set(themeCookieName, theme, { path: "/", maxAge: 31536000 });
}
