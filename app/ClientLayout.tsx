// app/ClientLayout.tsx
"use client";

import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../store";
import { ThemeProvider } from "@/context/ThemeContext";
import { NotificationProvider } from "@/context/NotificationContext";  // Import the NotificationProvider

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={GeistSans.className}>
      <ThemeProvider>
        <Provider store={store}>
          <NotificationProvider>  {/* Wrap the children with NotificationProvider */}
            <main className="w-full min-h-screen flex flex-col items-stretch">
              {children}
            </main>
          </NotificationProvider>
        </Provider>
      </ThemeProvider>
    </div>
  );
}
