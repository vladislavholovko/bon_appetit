import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';


class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboardBody">
                <div className="dashboardHead">

                </div>
                <div className="dashboardCenter">

                </div>
                <div className="dashboardBottom">

                </div>
            </div>
        )
    }
}

export default connect(store => ({store: store}))(withRouter(Dashboard))