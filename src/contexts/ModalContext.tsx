"use client";

import Modal from "@TCoin/components/modal/Modal";
import React, { createContext, ReactNode, useContext, useState } from "react";

type TModalSize = "small" | "medium" | "large";
type TModalProps = {
  content: ReactNode;
  size?: TModalSize;
};

interface ModalContextType {
  isOpen: boolean;
  openModal: (props: TModalProps) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [size, setSize] = useState<TModalSize>("small");

  const openModal = ({ content, size }: TModalProps) => {
    setModalContent(content);
    setSize(size || "small");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <Modal onClose={closeModal} size={size}>
          {modalContent}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
