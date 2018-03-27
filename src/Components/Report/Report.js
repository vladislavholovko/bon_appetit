import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import dateFormat from 'dateformat';
//------------
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
//------------
import * as usReport from "../../Actions/ReportAction";
import * as UsAct from '../../Actions/UserActions';


class Reports extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            name: "",
        };
    }

    componentDidMount() {
        usReport.usersReports();
        UsAct.UserInfo();
    }

//-----------------------------
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

//-----------------------------
    render() {
        let list = this.props.reports.map((value, index) => {
            return (
                <TableRow key={index}>
                    <TableRowColumn
                        style={{width: "200px"}}>{dateFormat(value.date, "yyyy-mm-dd HH:MM")}</TableRowColumn>
                    <TableRowColumn>{this.userName(value.user_id)}</TableRowColumn>
                    <TableRowColumn>{value.approved ? "Paid" : "Not paid"}</TableRowColumn>
                    <TableRowColumn style={{width: "100px"}}><FlatButton label="Details"/></TableRowColumn>
                </TableRow>
            )
        });

        return (
            <div className="reportBody">
                <div className="reportPanel">
                    <div className="reportFilter">
                        <div className="filterName">
                            <h1>FILTER</h1>
                        </div>
                        <div className="selectFilter">
                            <SelectField
                                value={this.state.name}
                                onChange={(event, index, value) => this.setState({name: value})}
                                floatingLabelStyle={{color: "#000", fontFamily: 'Neucha', fontSize: "18px"}}
                                selectedMenuItemStyle={{width: "200px"}}
                                floatingLabelText="Users">
                                {this.props.users.map((value, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={value.fullName}
                                            primaryText={value.fullName}
                                        />
                                    )
                                })

                                }
                            </SelectField>
                            <DatePicker
                                floatingLabelText="Date from"
                                mode="landscape"
                                textFieldStyle={{color: "#000", fontFamily: 'Neucha', fontSize: "18px", width: "100px"}}
                                dialogContainerStyle={{fontFamily: 'Neucha', fontSize: "18px"}}

                            />
                            <DatePicker
                                floatingLabelText="Date to"
                                mode="landscape"
                                textFieldStyle={{color: "#000", fontFamily: 'Neucha', fontSize: "18px", width: "100px"}}
                                dialogContainerStyle={{fontFamily: 'Neucha', fontSize: "18px"}}
                            />
                            <FlatButton style={{backgroundColor:"cyan"}} label="REFRESH"/>
                            <FlatButton label="CLEAR"/>
                        </div>
                    </div>
                    <div className="reportExport">
                        <div>
                            <FlatButton icon={<i className="material-icons">file_download</i>}  label="XLS"/>
                        </div>
                        <div>
                            <FlatButton icon={<i className="material-icons">file_download</i>} label="CSV"/>
                        </div>
                    </div>
                </div>
                {list.length === 0 ? (
                    <div className="reportInfo"><b>Reports list is empty</b></div>
                ) : (
                    <div className="reportList">
                        <Table style={{backgroundColor: "rgba(54, 54, 54, .3)"}} multiSelectable={true}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn style={{width: "200px"}}>Date</TableHeaderColumn>
                                    <TableHeaderColumn>User</TableHeaderColumn>
                                    <TableHeaderColumn>Status</TableHeaderColumn>
                                    <TableHeaderColumn style={{width: "80px"}}>Details</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {list}
                            </TableBody>
                        </Table>
                    </div>
                )}
                <ToastContainer/>
            </div>
        )
    }


}

export default connect(store => ({reports: store.report_info, users: store.user_info}))(withRouter(Reports))