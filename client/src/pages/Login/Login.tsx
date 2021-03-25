import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { PageContainer, Logo } from 'components';
import { useHeader } from 'hooks';
import styles from './Login.module.scss';

const Login: FC = () => {
  useHeader({
    noHeader: true,
  });
  const { push } = useHistory();

  return (
    <PageContainer
      containerClassName={styles.pageContainer}
      bodyClassName={styles.body}
    >
      <Logo className={styles.logo} />
      <div className={styles.title}>
        ตามหาคนหาร ปาร์ตี้หารช่วยได้
      </div>
      <div
        className={`${styles.inputContainer} ${styles.emailInput}`}
      >
        <input />
        <div className={styles.inputLabel}>อีเมล</div>
      </div>
      <div
        className={`${styles.inputContainer} ${styles.passwordInput}`}
      >
        <input />
        <div className={styles.inputLabel}>รหัสผ่าน</div>
      </div>
      <button
        className={`${styles.button} ${styles.loginButton}`}
        type="button"
      >
        เข้าสู่ระบบ
      </button>
      <button
        className={`${styles.button} ${styles.registerButton}`}
        type="button"
        onClick={() => push('/register')}
      >
        สร้างบัญชีผู้ใช้ใหม่
      </button>
    </PageContainer>
  );
};

export default Login;
