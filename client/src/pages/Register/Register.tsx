import { FC } from 'react';
import { PageContainer } from 'components';
import { useHeader } from 'hooks';
import styles from './Register.module.scss';

const Register: FC = () => {
  useHeader({
    title: 'สร้างบัญชีผู้ใช้',
    noLogoutButton: true,
  });

  return (
    <PageContainer
      containerClassName={styles.pageContainer}
      bodyClassName={styles.body}
    >
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>อีเมล</div>
        <input />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>รหัสผ่าน</div>
        <input />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputLabel}>ยืนยันรหัสผ่าน</div>
        <input />
      </div>
      <div className={styles.checkboxContainer}>
        <div className={styles.inputCheckbox}>
          <input type="checkbox" />
          <div className={styles.checkMarkContainer}>
            <div className={styles.checkMark} />
          </div>
        </div>
        ฉันยอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน
      </div>
      <button
        className={styles.button}
        type="button"
      >
        ยืนยัน
      </button>
    </PageContainer>
  );
};

export default Register;
