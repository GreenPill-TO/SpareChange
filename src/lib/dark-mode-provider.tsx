"use client";

import useDarkMode from "@/hooks/useDarkMode";
import { ReactNode } from "react";
import { cn } from "./classnames";

export default function DarkModeProvider({ children }: { children: ReactNode }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div id="main-content" className={cn({ dark: isDarkMode }, "w-screen h-screen")}>
      {children}
    </div>
  );
}
