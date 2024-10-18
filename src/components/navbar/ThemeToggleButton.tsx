"use client";

import useDarkMode from "@/hooks/useDarkMode";
import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "../ui/Button";

export function ThemeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button onClick={() => toggleDarkMode()} className="p-2 mr-2" size="icon" variant="ghost">
      {isDarkMode ? <LuSun className="w-6 h-6" /> : <LuMoon className="w-6 h-6 text-gray-800" />}
    </Button>
  );
}
