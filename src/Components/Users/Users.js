import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
//------------

class Users extends React.Component {

    render() {
        return (
            <div className="usersBody">
                <div className="userPanel">

                </div>
                <div className="userList">

                </div>
                <div className="userInfo">

                </div>
            </div>
        )
    }
}

export default connect(store => ({store: store}))(withRouter(Users))