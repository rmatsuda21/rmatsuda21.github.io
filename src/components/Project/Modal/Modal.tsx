import cn from "classnames";

import styles from "./Modal.module.scss";

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export const Modal = ({
  children,
  open,
  onClose,
}: React.PropsWithChildren<ModalProps>) => {
  return (
    <div
      onClick={onClose}
      className={cn(styles.modal, { [styles.open]: open })}
    >
      <div className={styles.backdrop} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
