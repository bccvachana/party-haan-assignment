import { FC, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { ICommonObject } from 'types/common.type';
import PrivatePage from './PrivatePage';

interface IPrivateRouteProps extends ICommonObject {
  children: ReactNode;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({
  children,
  ...props
}) => (
  <Route {...props}>
    <PrivatePage>
      {children}
    </PrivatePage>
  </Route>
);

export default PrivateRoute;
