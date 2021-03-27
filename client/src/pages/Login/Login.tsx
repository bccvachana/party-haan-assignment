import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { PageContainer, Logo } from 'components';
import { useHeader } from 'hooks';
import styles from './Login.module.scss';
import { useLogin } from './Login.hook';

const Login: FC = () => {
  useHeader({
    noHeader: true,
  });
  const { push } = useHistory();
  const { handleLogin } = useLogin();

  return (
    <PageContainer
      containerClassName={styles.pageContainer}
      bodyClassName={styles.body}
    >
      <Logo className={styles.logo} />
      <div className={styles.title}>
        ตามหาคนหาร ปาร์ตี้หารช่วยได้
      </div>
      <form
        className={styles.form}
        onSubmit={handleLogin}
      >
        <div
          className={`${styles.inputContainer} ${styles.emailInput}`}
        >
          <input type="email" name="email" />
          <div className={styles.inputLabel}>อีเมล</div>
        </div>
        <div
          className={`${styles.inputContainer} ${styles.passwordInput}`}
        >
          <input type="password" name="password" />
          <div className={styles.inputLabel}>รหัสผ่าน</div>
        </div>
        <button
          className={`${styles.button} ${styles.loginButton}`}
          type="submit"
          formNoValidate
        >
          เข้าสู่ระบบ
        </button>
      </form>
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
