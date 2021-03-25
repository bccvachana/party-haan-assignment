import { FC, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { ICommonObject } from 'types/common.type';

interface IPublicRouteProps extends ICommonObject {
  children: ReactNode,
}

const PublicRoute: FC<IPublicRouteProps> = ({ children, ...props }) => (
  <Route
    {...props}
    render={() => children}
  />
);

export default PublicRoute;
