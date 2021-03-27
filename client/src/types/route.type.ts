import { FC } from 'react';

export interface IRoute {
  path: string;
  PageComponent?: FC;
  redirectTo?: string;
}
