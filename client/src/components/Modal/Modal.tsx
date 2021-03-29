import { FC } from 'react';
import { usePage } from 'hooks';
import { FixedPageContainer } from 'components';
import ModalInfo from 'assets/images/modal-info.png';
import ModalError from 'assets/images/modal-error.png';
import styles from './Modal.module.scss';
import { closeModal } from '.';

const Modal: FC = () => {
  const {
    modal: {
      isModal,
      type,
      text,
      okText = 'ตกลง',
      cancelText = 'ยกเลิก',
      isCancel = true,
      onOk = () => { },
      onCancal = closeModal,
    },
  } = usePage();

  return (
    <FixedPageContainer
      bodyClassName={`${styles.body} ${isModal ? styles.active : ''}`}
    >
      <div className={`${styles.modal} ${type ? styles[type] : ''}`}>
        {type === 'info' && (
          <img src={ModalInfo} alt="modal-info" />
        )}
        {type === 'error' && (
          <>
            <div className={styles.title}>
              เกิดข้อผิดพลาด
            </div>
            <img src={ModalError} alt="modal-error" />
          </>
        )}
        <div className={styles.text}>{text}</div>
        <div className={styles.buttonContainer}>
          {(type === 'info' && isCancel) && (
            <button
              className={styles.cancel}
              type="button"
              onClick={onCancal}
            >
              {cancelText}
            </button>
          )}
          <button
            className={styles.ok}
            type="button"
            onClick={() => {
              onOk();
              closeModal();
            }}
          >
            {okText}
          </button>
        </div>
      </div>
    </FixedPageContainer>
  );
};

export default Modal;
