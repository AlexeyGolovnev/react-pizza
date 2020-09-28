import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './scss/app.scss'
import Header from "./components/Header/Header";
import Main from "./pages/Main";
import Basket from "./pages/Basket";


function App() {
    return (
        <div className='app-wrapper'>
            <Header />
                <main>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route path='/basket' component={Basket}/>
                    </Switch>
                </main>
        </div>
    );
}

export default App;

