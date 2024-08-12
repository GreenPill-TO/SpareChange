import React, { ReactNode, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

type ModalProps = {
  isOpen: boolean; // Ensure this prop controls modal visibility
  onClose: () => void;
  size?: "small" | "medium" | "large";
  closeBehavior?: "closeOnOutsideClickAndX" | "closeOnXOnly" | "noClose";
  children?: ReactNode;
};

function ModalLayoutNew({ isOpen, onClose, size = "medium", closeBehavior = "closeOnOutsideClickAndX", children }: ModalProps) {
  const { theme } = useTheme();

  // Add event listener for the 'Esc' key to close the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalWidthClass = size === "small" ? "max-w-sm" : size === "large" ? "max-w-4xl" : "max-w-lg";

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeBehavior === "closeOnOutsideClickAndX" && e.target === e.currentTarget) {
      onClose(); // Trigger close on outside click
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleOutsideClick}>
      <div
        className={`relative w-full ${modalWidthClass} max-h-full p-6 overflow-y-auto rounded-lg shadow-lg border-2 ${
          theme === "dark" ? "bg-black text-white border-white" : "bg-white text-black border-black"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {closeBehavior !== "noClose" && (
          <button className="absolute top-2 right-2 text-gray-600 text-3xl" onClick={onClose}>
            &times;
          </button>
        )}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default ModalLayoutNew;
