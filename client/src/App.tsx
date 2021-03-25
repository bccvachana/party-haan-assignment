import { FC } from 'react';
import { map } from 'lodash/fp';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import { Header, PrivateRoute, PublicRoute } from 'components';
import { publicRoutes, privateRoutes } from 'routes';
import { IRoute } from 'types/route.type';
import 'styles/global.scss';

const App: FC = () => (
  <>
    <Router>
      <Header />
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
        }: IRoute) => (
          <PublicRoute
            path={path}
            exact
            key={path}
          >
            {PageComponent && <PageComponent />}
          </PublicRoute>
        ), publicRoutes)}
      </Switch>
    </Router>
  </>
);

export default App;
