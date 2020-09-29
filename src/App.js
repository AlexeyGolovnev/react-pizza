import React, {Suspense, lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import './scss/app.scss'
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner/Spinner";

const Main = lazy(() => import("./pages/Main"));
const Basket = lazy(() => import("./pages/Basket"));

function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <main>
                <Switch>
                    <Suspense fallback={<Spinner/>}>
                        <Route exact path='/' component={Main}/>
                        <Route path='/basket' component={Basket}/>
                    </Suspense>
                </Switch>
            </main>
        </div>
    );
}

export default App;

