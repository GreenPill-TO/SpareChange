// app/ClientLayout.tsx
"use client";

import { useAuth } from "@TCoin/api/hooks/useAuth";
import { Footer } from "@TCoin/components/footer";
import Navbar from "@TCoin/components/navbar";
import classNames from "classnames";
import { GeistSans } from "geist/font/sans";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const bodyClass = classNames(
    "min-h-screen",
    "flex flex-col justify-between",
    "bg-el dark:bg-el-dark",
    "text-primary dark:text-primary-dark text-sm font-inter"
  );

  useEffect(() => {
    // Replace this with your actual authentication logic

    if (!isLoading && !isAuthenticated) {
      router.push("/"); // Redirect to the main page or login page
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className={GeistSans.className}>
      {!isLoading ? (
        <section className={bodyClass}>
          <Navbar />
          <div className="flex-grow flex flex-col dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 bg-gradient-to-r from-gray-200 to-gray-10">
            {children}
          </div>
          <Footer />
          <ToastContainer autoClose={1000} transition={Flip} theme={"colored"} />
        </section>
      ) : (
        <section className={bodyClass}>
          <div> Loading ... </div>
        </section>
      )}
    </div>
  );
}
