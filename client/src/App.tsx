import { FC } from 'react';
import { map } from 'lodash/fp';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
// import { Footer, Navbar } from 'components';
import { routes } from 'routes';
// import 'styles/global.scss';
// import { map } from 'lodash/fp';
import 'styles/global.scss';
import { Header } from 'components';

const App: FC = () => (
  <>
    <Router>
      <Header />
      <Switch>
        {map(({
          path,
          PageComponent,
        }) => (
          <Route
            path={path}
            exact
            key={path}
          >
            {PageComponent && <PageComponent />}
          </Route>
        ), routes)}
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  </>
);

export default App;
