import { useMemo, FormEvent } from 'react';
import { get } from 'lodash/fp';
import userService from 'services/user.service';
import { openModal } from 'components/Modal';
import { setIsPageLoading } from 'store/page/func';
import { IUseLoginReturns } from './Login.type';

export const useLogin = (): IUseLoginReturns => {
  const handleLogin = useMemo<(event: FormEvent<HTMLFormElement>) => void>(
    () => async (event) => {
      setIsPageLoading(true);
      event.preventDefault();
      try {
        const email = get('target.email.value', event);
        const password = get('target.password.value', event);
        if (!email || !password) throw new Error();
        await userService.login({
          email,
          password,
        });
      } catch (err) {
        setIsPageLoading(false);
        openModal({
          type: 'error',
          text: 'อีเมล หรือ รหัสผ่านผิดพลาด\nกรุณาลองใหม่อีกครั้ง',
          okText: 'ลองอีกครั้ง',
        });
      }
    }, []);

  return {
    handleLogin,
  };
};
