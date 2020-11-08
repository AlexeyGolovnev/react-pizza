import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DispatchContext } from './context';
import { useDispatch } from 'react-redux';
import Header from './components/Header/Header';
import Spinner from './components/Spinner/Spinner';
import './scss/app.scss';

const Main = lazy(() => import('./pages/Main'));
const Basket = lazy(() => import('./pages/Basket'));
const Auth = lazy(() => import('./pages/Auth'));
const User = lazy(() => import('./pages/User'));
const Order = lazy(() => import('./pages/Order'));

export default function App () {
  const dispatch = useDispatch();
  return (
    <DispatchContext.Provider value={{ dispatch }} >
      <div className='app-wrapper'>
        <Header />
        <main>
          <Switch>
            <Suspense fallback={<Spinner />}>
              <Route exact path='/' component={Main} />
              <Route exact path='/basket' component={Basket} />
              <Route exact path='/auth' component={Auth} />
              <Route exact path='/user' component={User} />
              <Route exact path='/order' component={Order} />
            </Suspense>
          </Switch>
        </main>
      </div>
    </DispatchContext.Provider>
  );
}
