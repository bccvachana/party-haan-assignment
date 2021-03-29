import { FC } from 'react';
import { map } from 'lodash/fp';
import {
  BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import {
  Header, Modal, PageLoading, PrivateRoute, PublicRoute,
} from 'components';
import { publicRoutes, privateRoutes } from 'routes';
import { IRoute } from 'types/route.type';
import { useApp } from 'App.hook';
import 'styles/global.scss';

const App: FC = () => {
  useApp();

  return (
    <>
      <Router>
        <Header />
        <Modal />
        <PageLoading />
        <Switch>
          {map(({
            path,
            PageComponent,
          }: IRoute) => (
            <PrivateRoute
              path={path}
              exact
              key={path}
            >
              {PageComponent && <PageComponent />}
            </PrivateRoute>
          ), privateRoutes)}
          {map(({
            path,
            PageComponent,
          }: IRoute) => (
            <PrivateRoute
              path={path}
              exact
              key={path}
            >
              {PageComponent && <PageComponent />}
            </PrivateRoute>
          ), privateRoutes)}
          {map(({
            path,
            PageComponent,
            redirectTo,
          }: IRoute) => (
            <PublicRoute
              path={path}
              exact
              key={path}
            >
              {redirectTo && <Redirect to={redirectTo} />}
              {PageComponent && <PageComponent />}
            </PublicRoute>
          ), publicRoutes)}
        </Switch>
      </Router>
    </>
  );
};

export default App;
