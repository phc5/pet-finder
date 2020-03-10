import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';
import store from './store';
import NavBar from './NavBar';

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <NavBar />
        <Suspense fallback={<h1>loading route</h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </Suspense>
      </div>
    </Provider>
  );
};

render(React.createElement(App), document.getElementById('root'));
