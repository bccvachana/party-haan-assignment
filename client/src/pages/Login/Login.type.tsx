import { FormEvent } from 'react';

export interface IUseLoginReturns {
  handleLogin: (event: FormEvent<HTMLFormElement>) => void;
}
