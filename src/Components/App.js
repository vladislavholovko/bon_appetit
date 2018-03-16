import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import logger from 'redux-logger';
//--------------------
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../Sources/App.css';
import '../Sources/login.css'
import '../Sources/registration.css'
import '../Sources/panel.css'
import '../Sources/dashboard.css'
//--------------------
import Login from './Login_Regestration/Login';
import Registration from "./Login_Regestration/Registration";
import Panel from "./Panel/Panel";
//--------------------
import Info from '../Reducers/ReducerCompany';
export const store = createStore(Info, applyMiddleware(logger));
//--------------------

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Login}/>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/panel" component={Panel}/>
                        </Switch>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
