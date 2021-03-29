import { FC, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ICommonObject } from 'types/common.type';
import { useUser } from 'hooks';
import { isEmpty, isEqual } from 'lodash/fp';

interface IPrivateRouteProps extends ICommonObject {
  children: ReactNode;
}

const PrivateRoute: FC<IPrivateRouteProps> = ({ children, ...props }) => {
  const user = useUser();

  return (
    <Route {...props}>
      {isEqual(user, {}) && <Redirect to="/login" />}
      {(!isEmpty(user)) && children}
    </Route>
  );
};

export default PrivateRoute;
