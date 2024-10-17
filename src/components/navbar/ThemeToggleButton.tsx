"use client";

import useDarkMode from "@/hooks/useDarkMode";
import { LuMoon, LuSun } from "react-icons/lu";

export function ThemeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button onClick={() => toggleDarkMode()} className="p-2">
      {isDarkMode ? <LuSun className="w-6 h-6 text-yellow-500" /> : <LuMoon className="w-6 h-6 text-gray-800" />}
    </button>
  );
}
