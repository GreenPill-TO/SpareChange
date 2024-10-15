"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import useDarkMode from "@TCoin/hooks/useDarkMode";

export default function ThemeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button onClick={() => toggleDarkMode()} className="p-2">
      {isDarkMode ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-gray-800" />}
    </button>
  );
}
