import cn from "classnames";

import styles from "./Modal.module.scss";
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

export const Modal = ({
  children,
  open,
  onClose,
  className,
}: React.PropsWithChildren<ModalProps>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={cn(styles.modal, { [styles.open]: open })}>
      <div onClick={onClose} className={styles.close}>
        <FaTimes />
      </div>
      <div onClick={onClose} className={styles.backdrop} />
      <div className={cn(styles.content, className)}>{children}</div>
    </div>
  );
};
