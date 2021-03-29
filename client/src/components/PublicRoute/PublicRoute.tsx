import { FC, ReactNode } from 'react';
import { isEmpty, isEqual } from 'lodash/fp';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from 'hooks';
import { ICommonObject } from 'types/common.type';

interface IPublicRouteProps extends ICommonObject {
  children: ReactNode,
}

const PublicRoute: FC<IPublicRouteProps> = ({ children, ...props }) => {
  const user = useUser();
  return (
    <Route {...props}>
      {!isEmpty(user) && <Redirect to="/party" />}
      {(isEqual(user, {})) && children}
    </Route>
  );
};

export default PublicRoute;
