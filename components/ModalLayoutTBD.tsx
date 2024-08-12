// components/ModalLayout.tsx
import { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalLayout = ({ isOpen, onClose, children }: ModalProps) => {
  const { theme } = useTheme(); // Access the current theme

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`${
          theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-300"
        } rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative border-2`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-400 text-3xl focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
