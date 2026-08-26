import React from "react";
import modalStyle from "./Modal.module.css";
import { Text } from "../../ui/Text/Text";
import Button from "../../ui/Button/Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={modalStyle.overlay} onClick={onClose}>
      <div className={modalStyle.modal} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyle.header}>
          {title && <Text variant="h2" children={title} />}

          <Button
            type="button"
            className={modalStyle.closeBtn}
            onClick={onClose}
            children={"X"}
          />
        </div>
        <div className={modalStyle.content}>{children}</div>
      </div>
    </div>
  );
}
