import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebarPanel">
                <div className="sidebarLogo">
                    <span>Bon Appetit</span>
                </div>
                <div>
                    <ul className="listPanel">
                        <li><NavLink
                            className="link"
                            to="/panel/dashboard">
                            <i className="material-icons">dashboard</i>Dashboard
                        </NavLink></li>
                        <li><NavLink
                            className="link"
                            to="/panel/users">
                            <i className="material-icons">group</i>Users
                        </NavLink></li>
                        <li><NavLink
                            className="link"
                            to="/panel/report">
                            <i className="material-icons">inbox</i>Reports
                        </NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default (withRouter(connect(store => ({store: store}))(Sidebar)))