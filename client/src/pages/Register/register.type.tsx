import { FormEvent, RefObject } from 'react';
import { TNotReturnFunction } from 'types/common.type';

export interface IUseRegisterReturns {
  formRef: RefObject<HTMLFormElement>,
  isDisableSubmit: boolean;
  onChange: TNotReturnFunction;
  handleRegister: (event: FormEvent<HTMLFormElement>) => void;
}
