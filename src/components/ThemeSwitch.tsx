import "htmx.org";
import { LucideMonitor, LucideMoonStar, LucideSunMedium } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "~/utils/misc";
import type { Theme } from "~/utils/theme";
import { useForm, getFormProps } from "@conform-to/react";

export function ThemeSwitch({
  userPreference,
}: {
  userPreference?: Theme | null;
}) {
  const [formLight] = useForm({
    id: "theme-switch-light",
  });
  const [formDark] = useForm({
    id: "theme-switch-dark",
  });
  const [formSystem] = useForm({
    id: "theme-switch-system",
  });

  const mode = userPreference ?? "system";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ring-brand px-2">
          <LucideSunMedium
            className={cn(
              "h-6 w-6 dark:hidden",
              mode === "light" ? "text-black" : "text-red-500"
            )}
          />
          <LucideMoonStar className="text-brand hidden h-6 w-6 dark:inline" />
          <span className="sr-only">Change theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={8}
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="bg-white"
        >
          <DropdownMenuItem asChild>
            <form hx-post="/api/theme" {...getFormProps(formLight)}>
              <input type="hidden" name="theme" value="light" />
              <button
                type="submit"
                className={cn(
                  `flex w-full cursor-pointer items-center gap-3`,
                  "light" === mode ? "text-primary" : ""
                )}
              >
                <LucideSunMedium className="h-6 w-6" strokeWidth={1.75} />
                Light
              </button>
            </form>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <form hx-post="/api/theme" {...getFormProps(formDark)}>
              <input type="hidden" name="theme" value="dark" />
              <button
                type="submit"
                className={cn(
                  `flex w-full cursor-pointer items-center gap-3`,
                  "dark" === mode ? "text-primary" : ""
                )}
              >
                <LucideMoonStar className="h-5 w-5" />
                Dark
              </button>
            </form>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <form hx-post="/api/theme" {...getFormProps(formSystem)}>
              <input type="hidden" name="theme" value="system" />
              <button
                type="submit"
                className={cn(
                  `flex w-full cursor-pointer items-center gap-3`,
                  "system" === mode ? "text-primary" : ""
                )}
              >
                <LucideMonitor className="h-5 w-5" />
                System
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
