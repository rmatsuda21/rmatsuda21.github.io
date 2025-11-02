import { useEffect } from "react";
import cn from "classnames";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { FaTimes } from "react-icons/fa";

import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  className?: string;
  rootElement?: HTMLElement;
};

export const Modal = ({
  children,
  open,
  onClose,
  className,
  rootElement = document.body,
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

  const transition: Transition = { duration: 0.15, ease: "easeInOut" };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={cn(styles.modal, { [styles.open]: open })}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={onClose}
            className={styles.close}
            type="button"
          >
            <FaTimes />
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={onClose}
            className={styles.backdrop}
          />
          <motion.div
            initial={{
              opacity: "var(--init-modal-opacity)",
              scale: "var(--init-modal-scale)",
              x: "var(--init-modal-x)",
            }}
            animate={{
              opacity: "var(--final-modal-opacity)",
              scale: "var(--final-modal-scale)",
              x: "var(--final-modal-x)",
            }}
            exit={{
              opacity: "var(--init-modal-opacity)",
              scale: "var(--init-modal-scale)",
              x: "var(--init-modal-x)",
            }}
            transition={transition}
            className={cn(styles.content, className)}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    rootElement
  );
};
