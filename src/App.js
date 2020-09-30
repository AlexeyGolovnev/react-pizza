import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import './scss/app.scss';
import {DispatchContext} from './context';
import Header from './components/Header/Header';
import Spinner from './components/Spinner/Spinner';
import {useDispatch} from 'react-redux';

const Main = lazy(() => import('./pages/Main'));
const Basket = lazy(() => import('./pages/Basket'));

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
              <Route path='/basket' component={Basket} />
            </Suspense>
          </Switch>
        </main>
      </div>
    </DispatchContext.Provider>
  );
}
