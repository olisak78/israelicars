import React from 'react';
import './Modal.css';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className='modal-backdrop' onClick={handleBackdropClick}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2 className='modal-title'>{title}</h2>
          <button
            className='modal-close-button'
            onClick={onClose}
            title={t('common.close')}
          >
            ×
          </button>
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
