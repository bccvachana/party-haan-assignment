import { FC } from 'react';
import LogoDuck from 'assets/images/duck-1.png';
import LogoText from 'assets/images/logo-text.svg';
import styles from './Logo.module.scss';

interface ILogoProps {
  className?: string;
}

const Login: FC<ILogoProps> = ({ className }) => (
  <div className={`${styles.logo} ${className || ''}`}>
    <img
      className={styles.logoDuck}
      src={LogoDuck}
      alt="logo-duck"
    />
    <img
      className={styles.logoText}
      src={LogoText}
      alt="logo-text"
    />
  </div>
);

export default Login;
