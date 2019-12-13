import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import Header from './components/Header'
import Footer from './components/Footer'

import './pageStyles/App.css'

function App() {

    /*function loggedIn() {
        // ...
        return true;
    }
    function requireAuth(nextState, replace) {
        if (!loggedIn()) {
            replace({
                pathname: '/admin' // not working yet to prevent access of other pages
            })
        }
    }*/

    function getIdFromUrl() {
        const params = window.location.href.split('/');
        return params[params.length - 1]
    }

    return (
        <Router>
            <div className='container'>
                <Header />
                <main>

                    <Switch>
                        <Route exact path="/loginpage/" render={(props) => <LoginPage {...props} getId={getIdFromUrl()} />}/>
                        <Route exact path="/mainpage/" render={(props) => <MainPage {...props} getId={getIdFromUrl()} />}/>
                    </Switch>

                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;