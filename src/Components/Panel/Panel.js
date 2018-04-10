import React from 'react';
import {withRouter} from 'react-router';
import {Switch, Route,Redirect} from 'react-router-dom';
//-------------
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import Users from '../Users/Users';
import Reports from '../Report/Report';

class Panel extends React.Component {
    render() {
        return (
            <div className="panelBody">
                <Sidebar/>
                <div className="panelContainer">
                    <Header/>
                    <Switch>
                        <Redirect exact from="/panel" to="/panel/dashboard"/>
                        <Route path="/panel/dashboard" component={Dashboard}/>
                        <Route path="/panel/users" component={Users}/>
                        <Route path="/panel/report" component={Reports}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(Panel)