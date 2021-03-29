import { FC } from 'react';
import { Input, PageContainer } from 'components';
import { useHeader } from 'hooks';
import { useRegister } from './Register.hook';
import styles from './Register.module.scss';

const Register: FC = () => {
  useHeader({
    title: 'สร้างบัญชีผู้ใช้',
    noLogoutButton: true,
  });
  const {
    isDisableSubmit,
    formRef,
    onChange,
    handleRegister,
  } = useRegister();

  return (
    <PageContainer containerClassName={styles.pageContainer}>
      <form
        className={styles.form}
        ref={formRef}
        onChange={onChange}
        onSubmit={handleRegister}
      >
        <Input label="อีเมล" type="email" name="email" />
        <Input label="รหัสผ่าน" type="password" name="password" />
        <Input label="ยืนยันรหัสผ่าน" type="password" name="retryPassword" />
        <div className={styles.checkboxContainer}>
          <div className={styles.inputCheckbox}>
            <input type="checkbox" name="consent" />
            <div className={styles.checkMarkContainer}>
              <div className={styles.checkMark} />
            </div>
          </div>
          ฉันยอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน
        </div>
        <button
          className={`${styles.button} ${isDisableSubmit ? styles.disabled : ''}`}
          type="submit"
          formNoValidate
          disabled={isDisableSubmit}
        >
          ยืนยัน
        </button>
      </form>
    </PageContainer>
  );
};

export default Register;
