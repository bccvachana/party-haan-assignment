import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>loading</div>}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);
