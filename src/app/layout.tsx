import { ModalProvider } from "@/contexts/ModalContext";
import DarkModeProvider from "@/lib/dark-mode-provider";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import "@/styles/globals.scss";
import type { Metadata } from "next";
import ContentLayout from "./ContentLayout";

export const metadata: Metadata = {
  title: "Spare Change",
  description: "Help people donate to Panhandlers, Waitresses and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <DarkModeProvider>
            <ModalProvider>
              <ContentLayout>{children}</ContentLayout>
            </ModalProvider>
          </DarkModeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
