import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//------------
import {AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid} from 'recharts';
import LinearProgress from 'material-ui/LinearProgress';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
//------------
import * as Info from '../../Actions/DashboardAction';
//------------

const data = [
    {name: '14.02.18', total: 8, paid: 7},
    {name: '15.02.18', total: 9, paid: 9},
    {name: '16.02.18', total: 8, paid: 5},
    {name: '17.02.18', total: 9, paid: 6},
    {name: '18.02.18', total: 10, paid: 8},
    {name: '19.02.18', total: 10, paid: 10},
    {name: '20.02.18', total: 9, paid: 3}
];

class Dashboard extends React.Component {
    componentDidMount() {
        Info.DashboardInfo();
        Info.UserInfo();
    }

    userName(user_id) {
        let user = this.props.users.find(value => {
            return value._id === user_id
        });
        if (user === undefined) {
            return null;
        } else {
            return user.fullName;
        }
    }

    render() {
        let listReport = this.props.dashboard.lastFiveReports.map((value, index) => {
            return (
                <ListItem
                    key={index}
                    primaryText={this.userName(value.user_id) + " at "}
                    rightIcon={<i className="material-icons">inbox</i>}
                    leftAvatar={<Avatar src={`http://web.bidon-tech.com:65059/images/${value.image}`}/>}
                />
            )
        });
        // let useSpace = this.props.store.data_company.useSpace !== undefined ? this.props.store.data_company.useSpace : 0;
        let useSpace = this.props.company.useSpace;
        let totalSpace = this.props.company.totalSpace;
        let percent = useSpace === 0 ? 0 : useSpace * 100 / totalSpace;

        return (
            <div className="dashboardBody">
                {/*DIAGRAM*/}
                <div className="dashboardHead">
                    <h3>Overview</h3>
                    <AreaChart width={800} height={200} data={data}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="rgb(2, 74, 229)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="rgb(2, 74, 229)" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="rgb(214, 221, 6)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="rgb(214, 221, 6)" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#212121"/>
                        <YAxis stroke="#212121"/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="total" stroke="#8884d8" fill="url(#colorUv)"/>
                        <Area type="monotone" dataKey="paid" stroke="#82ca9d" fill="url(#colorPv)"/>
                    </AreaChart>
                </div>
                {/*CENTER*/}
                <div className="dashboardCenter">
                    <div className="dashboardLiner">
                        <div className="dashboardChild">
                            <h3>Disk space</h3>
                            <LinearProgress mode="determinate" value={percent}/>
                            <div className="spaceInfo">
                                <p>{useSpace.toFixed(1)}Mb</p>
                                <p>{totalSpace}Mb</p>
                            </div>
                            <div className="useInfo">
                                <p>Currently you use {useSpace.toFixed(1)}Mb ({percent.toFixed(1)}%)
                                    of {totalSpace}Mb.</p>
                            </div>
                        </div>
                    </div>
                    <div className="dashboardInfo">
                        <div className="UserAndReport">
                            <div className="Child">
                                <h3>Users</h3>
                                <div className="UserAndReportInfo">
                                    <p>{this.props.dashboard.userCount}</p>
                                    <Link className="Link" to="/panel/users">Go to users list</Link>
                                </div>
                            </div>
                        </div>
                        <div className="UserAndReport">
                            <div className="Child">
                                <h3>Reports</h3>
                                <div className="UserAndReportInfo">
                                    <p>{this.props.dashboard.reportCount}</p>
                                    <Link className="Link" to="/panel/report">Go to reports lists</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*BOTTOM*/}
                <div className="dashboardBottom">
                    <div className="dashboardBottomReport">
                        <div className="Child">
                            <h3>Last 5 reports</h3>
                            <List>
                                {this.props.dashboard.reportCount !== 0 ? listReport : (
                                    <div className="EmptyList">
                                        <p>Reports list is empty</p>
                                    </div>
                                )}
                            </List>
                        </div>
                    </div>
                    <div className="dashboardBottomDisk">
                        <div className="Child">
                            <h3>Upgrade your disk space</h3>
                            <div className="Text">
                                <p>
                                    <i className="material-icons">info </i> &ensp; Get <strong> 10Gb &ensp;</strong> disk
                                    space for only&ensp; <strong> $1.99 </strong><br/>
                                    Use &ensp; <a href=""> this form</a>&ensp;  to contact us
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(store => ({company: store.data_company,dashboard: store.dashboard_info,users: store.user_info}))(withRouter(Dashboard))