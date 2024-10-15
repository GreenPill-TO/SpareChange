import React from "react";

interface InfoBoxProps {
  message: string;
  type?: "info" | "warning" | "error" | "success";
}

const InfoBox: React.FC<InfoBoxProps> = ({ message, type = "info" }) => {
  const baseClasses = "p-4 rounded-md text-sm";

  const themeClasses =
    "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 bg-white border-gray-300 text-gray-900";

  const typeClasses = {
    info: "dark:border-blue-500 dark:text-blue-400 border-blue-300 text-blue-700",
    warning: "dark:border-yellow-500 dark:text-yellow-400 border-yellow-300 text-yellow-700",
    error: "dark:border-red-500 dark:text-red-400 border-red-300 text-red-700",
    success: "dark:border-green-500 dark:text-green-400 border-green-300 text-green-700",
  }[type];

  return <div className={`${baseClasses} ${themeClasses} ${typeClasses} border`}>{message}</div>;
};

export default InfoBox;
