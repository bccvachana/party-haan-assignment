import { FormEvent, RefObject } from 'react';
import { TNotReturnFunction } from 'types/common.type';

export interface IUseCreatePartyReturns {
  formRef: RefObject<HTMLFormElement>,
  isDisableSubmit: boolean;
  onChange: TNotReturnFunction;
  handleCreateParty: (event: FormEvent<HTMLFormElement>) => void;
}
