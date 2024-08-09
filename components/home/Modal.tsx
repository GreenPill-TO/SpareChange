import { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const { theme } = useTheme(); // Access the current theme

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`${
          theme === "dark" ? "bg-black text-white border-white" : "bg-white text-black border-black"
        } rounded-lg shadow-lg max-w-md w-full p-6 relative border-2`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
