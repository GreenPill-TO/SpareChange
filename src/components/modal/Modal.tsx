import { useModal } from "@/contexts/ModalContext";
import { cn } from "@/lib/classnames";
import React, { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  closeOnOutside?: boolean;
  size?: "small" | "medium" | "large";
}

const Modal: React.FC<ModalProps> = ({ onClose, children, closeOnOutside = true, size = "small" }) => {
  const { isOpen } = useModal();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && closeOnOutside) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener when modal is closed or component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const modalWidthClass = size === "small" ? "max-w-sm" : size === "large" ? "max-w-4xl" : "max-w-lg";

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 dark:bg-opacity-50 flex">
      <div
        className={cn("relative p-4 bg-card m-auto flex-col flex rounded-lg shadow-lg", "max-h-screen4/5 overflow-auto", modalWidthClass)}
        ref={modalRef}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <LuX width={24} height={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
