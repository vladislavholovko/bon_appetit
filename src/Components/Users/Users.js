import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';


class Users extends React.Component {

    render() {
        return (
            <div>
                <p>Yes</p>
                <p>Yes</p>
                <p>Yes</p>
                <p>Yes</p>
                <p>Yes</p>
                <p>Yes</p>
                <p>Yes</p>
            </div>
        )
    }
}

export default connect(store => ({store: store}))(withRouter(Users))