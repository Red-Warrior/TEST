import React, { FC, memo } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  handleCloseModal: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = memo(({handleCloseModal}) => {
  return (
    <div className={styles.overlay} onClick={handleCloseModal} />
  );
});

export default ModalOverlay;
