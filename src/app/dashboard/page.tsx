"use client";
import { useAuth } from "@TCoin/api/hooks/useAuth";
import classNames from "classnames";
import { useMemo } from "react";
import { PanholderScreen } from "./screens";

export default function Dashboard() {
  const { userData, error, isLoadingUser } = useAuth();

  const mainClass = classNames("pt-24 p-8");

  const screenContent = useMemo(() => {
    if (isLoadingUser || error) return null;

    switch (userData?.cubidData?.persona) {
      case "ph":
        return <PanholderScreen />;
      default:
        return <div />;
    }
  }, [userData]);

  if (error) {
    return <div className={mainClass}>Error loading data: {error.message}</div>;
  }

  if (isLoadingUser) return <div className={mainClass}> ... Loading </div>;

  return <div className={mainClass}>{screenContent}</div>;
}
