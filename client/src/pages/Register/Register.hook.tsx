import {
  useState, useMemo, FormEvent, useRef,
} from 'react';
import { get } from 'lodash/fp';
import userService from 'services/user.service';
import { openModal } from 'components/Modal';
import { TNotReturnFunction } from 'types/common.type';
import { useHistory } from 'react-router-dom';
import { setIsPageLoading } from 'store/page/func';
import { IUseRegisterReturns } from './register.type';

const registerError = {
  wrongEmail: {
    message: 'wrongEmail',
    text: 'รูปแบบอีเมลไม่ถูกต้อง',
  },
  passwordNotMatch: {
    message: 'passwordNotMatch',
    text: 'รหัสผ่านทั้งสองช่องไม่ตรงกัน',
  },
  passwordMinLength: {
    message: 'passwordMinLength',
    text: 'รหัสผ่านต้องมีความยาว\nไม่น้อยกว่า 8 ตัวอักษร',
  },
  duplicateEmail: {
    message: 'duplicateEmail',
    text: 'อีเมลนี้มีคนใช้แล้ว\nกรุณาเปลี่ยนอีเมลใหม่',
  },
};

const checkEmailRegEx = /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/;

export const useRegister = (): IUseRegisterReturns => {
  const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(true);
  const formRef = useRef<HTMLFormElement>(null);
  const { push } = useHistory();

  const onChange = useMemo<TNotReturnFunction>(
    () => () => {
      const email = get('current.email.value', formRef);
      const password = get('current.password.value', formRef);
      const retryPassword = get('current.retryPassword.value', formRef);
      const consent = get('current.consent.checked', formRef);
      if (email && password && retryPassword && consent) setIsDisableSubmit(false);
      else setIsDisableSubmit(true);
    }, [],
  );

  const handleRegister = useMemo<(event: FormEvent<HTMLFormElement>) => void>(
    () => async (event) => {
      setIsPageLoading(true);
      event.preventDefault();
      try {
        const email = get('current.email.value', formRef);
        const password = get('current.password.value', formRef);
        const retryPassword = get('current.retryPassword.value', formRef);
        if (!checkEmailRegEx.test(email)) {
          throw new Error(
            registerError.wrongEmail.message,
          );
        }
        if (password !== retryPassword) {
          throw new Error(
            registerError.passwordNotMatch.message,
          );
        }
        if (password.length < 8) {
          throw new Error(
            registerError.passwordMinLength.message,
          );
        }
        await userService.register({
          email,
          password,
        });
        setIsPageLoading(false);
        openModal({
          type: 'info',
          text: 'สร้างบัญชีผู้ใช้สำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            push('/login');
          },
          isCancel: false,
        });
      } catch (err) {
        setIsPageLoading(false);
        openModal({
          type: 'error',
          text: get('response.data.code', err) === 500
            ? get('duplicateEmail.text', registerError)
            : get(`${err.message}.text`, registerError),
          okText: 'ลองอีกครั้ง',
        });
      }
    }, []);

  return {
    formRef,
    isDisableSubmit,
    onChange,
    handleRegister,
  };
};
