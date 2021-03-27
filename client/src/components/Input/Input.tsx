import { FC } from 'react';
import { ICommonObject } from 'types/common.type';
import styles from './Input.module.scss';

interface IInputProps extends ICommonObject {
  containerClassName?: string;
  inputClassName?: string;
  label?: string;
}

const Input: FC<IInputProps> = ({
  containerClassName,
  inputClassName,
  label,
  ...props
}) => (
  <div
    className={`${styles.container} ${containerClassName || ''}`}
  >
    {label && (
      <div
        className={styles.label}
      >
        {label}
      </div>
    )}
    <input
      className={inputClassName || ''}
      {...props}
    />
  </div>
);

export default Input;
