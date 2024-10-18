import { useModal } from "@/contexts/ModalContext";
import { cn } from "@/lib/classnames";
import React, { useEffect, useMemo, useRef } from "react";
import { LuX } from "react-icons/lu";
import { Card } from "../ui/Card";

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

  const modalWidthClass = useMemo(() => {
    switch (size) {
      case "small":
        return "max-w-sm";
      case "large":
        return "max-w-4xl";
      default:
        return "max-w-lg";
    }
  }, [size]);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 dark:bg-opacity-50 flex">
      <Card
        className={cn("relative p-4 m-auto flex-col flex rounded-lg shadow-lg", "max-h-screen4/5 overflow-auto", "text-primary", modalWidthClass)}
        ref={modalRef}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <LuX width={24} height={24} />
        </button>
        {children}
      </Card>
    </div>
  );
};

export default Modal;
