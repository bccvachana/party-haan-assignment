import { FC } from 'react';
import { Input, PageContainer } from 'components';
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
      <Input label="อีเมล" />
      <Input label="รหัสผ่าน" />
      <Input label="ยืนยันรหัสผ่าน" />
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
