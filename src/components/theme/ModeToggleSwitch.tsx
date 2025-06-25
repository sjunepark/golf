import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";

export function ModeToggleSwitch() {
  const [theme, setThemeState] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "light");
  }, []);

  React.useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  const handleToggle = (checked: boolean) => {
    setThemeState(checked ? "light" : "dark");
  };

  return (
    <SwitchPrimitive.Root
      checked={theme === "light"}
      onCheckedChange={handleToggle}
      className={cn(
        "group peer bg-muted focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      <span className="sr-only">Toggle theme</span>
      <SwitchPrimitive.Thumb
        className={cn(
          "bg-background pointer-events-none relative inline-block h-5 w-5 transform rounded-full shadow-sm ring-0 transition duration-200 ease-in-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        )}
      >
        {/* Moon Icon - visible when dark mode (unchecked) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in group-data-[state=checked]:opacity-0 group-data-[state=checked]:duration-100 group-data-[state=checked]:ease-out"
        >
          <MoonIcon className="text-muted-foreground h-3 w-3" />
        </span>
        {/* Sun Icon - visible when light mode (checked) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-[state=checked]:opacity-100 group-data-[state=checked]:duration-200 group-data-[state=checked]:ease-in"
        >
          <SunIcon className="text-primary h-3 w-3" />
        </span>
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}
