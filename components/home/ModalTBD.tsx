//components/home/Modal.tsx
import { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "small" | "medium" | "large";
  closeBehavior?: "closeOnOutsideClickAndX" | "closeOnXOnly" | "noClose"; // New prop to control close behavior
};

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "medium",
  closeBehavior = "closeOnOutsideClickAndX",
}: ModalProps) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const modalWidthClass = size === "small" ? "max-w-sm" : size === "large" ? "max-w-4xl" : "max-w-lg";

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeBehavior === "closeOnOutsideClickAndX" && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick} // Handle outside click based on the close behavior
    >
      <div
        className={`relative w-full ${modalWidthClass} max-h-full p-6 overflow-y-auto rounded-lg shadow-lg border-2 ${
          theme === "dark" ? "bg-black text-white border-white" : "bg-white text-black border-black"
        }`}
      >
        {closeBehavior !== "noClose" && (
          <button
            className="absolute top-2 right-2 text-gray-600 text-3xl"
            onClick={onClose}
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
