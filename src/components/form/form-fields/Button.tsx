import classNames from "classnames";
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button", disabled = false }) => {
  const buttonClasses = classNames(
    "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700 dark:focus:ring-indigo-500",
    "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400",
    { "opacity-50 cursor-not-allowed": disabled }
  );

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClasses}>
      {label}
    </button>
  );
};

export default Button;
