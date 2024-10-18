"use client";
import { useAuth } from "@/api/hooks/useAuth";
import { useMemo } from "react";
import { WalletScreen } from "./screens";

export default function Dashboard() {
  const { userData, error, isLoadingUser } = useAuth();

  const mainClass = "p-4 sm:p-8";

  const screenContent = useMemo(() => {
    if (isLoadingUser || error) return null;

    switch (userData?.cubidData?.persona) {
      // case "ph":
      //   return <PanhandlerScreen />;
      // case "dr":
      //   return <DonorScreen />;
      default:
        return <WalletScreen />;
    }
  }, [userData]);

  if (error) {
    return <div className={mainClass}>Error loading data: {error.message}</div>;
  }

  if (isLoadingUser) return <div className={mainClass}> ... Loading </div>;

  return <div className={mainClass}>{screenContent}</div>;
}
