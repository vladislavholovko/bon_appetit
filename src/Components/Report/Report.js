import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import dateFormat from 'dateformat';
//------------
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
//------------
import Filter from './Filter';
import * as usReport from "../../Actions/ReportAction";
import * as UsAct from '../../Actions/UserActions';
import * as styles from "../Login_Regestration/style";
import {host} from '../../Actions/host';


class Reports extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            snack: false,
            rows: []
        };
    }

    componentDidMount() {
        usReport.usersReports();
        UsAct.UserInfo();
        if (this.props.location.state !== undefined) {
            let id = this.props.location.state;
            let reports = this.props.reports.find(value => {
                return value._id === id
            });
            this.setState({...reports, open: true});
        }
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
    handleOpen = (reportInfo, e = null) => {
        if (e) e.stopPropagation();
        this.setState({...reportInfo, rows: [], open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.history.push('/panel/report/')
    };

//-----------------------------
    selectedRow(selected){
        if(selected === 'all'){
            this.setState({rows:this.props.reports.map(value => value._id)})
        }else {
            let reports = this.props.reports.filter((value, index) => selected.indexOf(index) > -1);
            console.log(reports);
            this.setState({rows: reports.map(value => value._id)})
        }
    }

    allPaid (){
        let rows = this.state.rows;
        rows.map(value => {
            let mas = this.props.reports.filter(val=>value===val._id);
            mas.map(v => {
                // usReport.EditReport(v._id, v.category_id, v.comment, !v.approved);
                usReport.EditReport(v._id, v.category_id, v.comment, true);
            })
        });
        this.setState({rows:[]})
    }

    approvedReport(id, category_id, comment, approved) {
        // approved = !approved;
        approved = true;
        usReport.EditReport(id, category_id, comment, approved);
        toast.success('Report has been updated successfully');
    }

//-----------------------------
    dialogInfo() {
        return (
            <Dialog
                title="Report details"
                contentStyle={{width: "700px"}}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}>
                <div className="dialogBody">
                    <div className="dialogImage">
                        <a href={`${host}images/${this.state.image}`}>
                            <img style={{borderRadius: "15px"}}
                                 src={`${host}images/${this.state.image}`}
                                 alt={this.state.createdAt}/>
                        </a>
                    </div>
                    <div className="dialogReportInfo">
                        <List>
                            <h4>Informations</h4>
                            <ListItem primaryText={this.userName(this.state.user_id)} secondaryText="User"
                                      leftIcon={<i className="material-icons">person</i>}/>
                            <ListItem primaryText={dateFormat(this.state.date, "yyyy-mm-dd HH:MM")}
                                      secondaryText="Was created at"
                                      leftIcon={<i className="material-icons">date_range</i>}/>
                            <ListItem primaryText={dateFormat(this.state.createdAt, "yyyy-mm-dd HH:MM")}
                                      secondaryText="Was loaded at"
                                      leftIcon={<i className="material-icons">cloud_upload</i>}/>
                            <ListItem primaryText={this.state.approved ? "Paid" : "Not paid"}
                                      secondaryText="Status of report"
                                      leftIcon={<i className="material-icons">check</i>}/>
                        </List>
                        <div className="dialogReportButton">
                            <FlatButton
                                label="CANCEL"
                                primary={true}
                                onClick={this.handleClose}
                                labelStyle={styles.floatingLabelStyle}
                            />
                            <FlatButton
                                label="PAID"
                                primary={true}
                                keyboardFocused={true}
                                labelStyle={styles.floatingLabelStyle}
                                onClick={() => {
                                    this.approvedReport(this.state._id, this.state.category_id, this.state.comment, this.state.approved);
                                    this.setState({approved: !this.state.approved});
                                }}
                                disabled={!!this.state.approved}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        )
    }

//-----------------------------
    render() {
        let allList = this.props.reportFilter === undefined ? this.props.reports : this.props.reportFilter;
        let list = allList.map((value, index) => {
            return (
                <TableRow key={index} selected={this.state.rows.indexOf(value._id) > -1} selectable={!value.approved} >
                    <TableRowColumn
                        style={{width: "200px"}}>{dateFormat(value.date, "yyyy-mm-dd HH:MM")}</TableRowColumn>
                    <TableRowColumn>{this.userName(value.user_id)}</TableRowColumn>
                    <TableRowColumn>{value.approved ? "Paid" : "Not paid"}</TableRowColumn>
                    <TableRowColumn style={{width: "100px"}}>
                        <FlatButton label="Details" onClick={this.handleOpen.bind(this, value)}/>
                    </TableRowColumn>
                </TableRow>
            )
        });

        return (
            <div className="reportBody">
                {/*FILTER*/}
                <Filter/>
                {/*REPORT USERS*/}
                {list.length === 0 ? (
                    <div className="reportInfo"><b>Reports list is empty</b></div>
                ) : (
                    <div className="reportList">
                        {this.dialogInfo()}
                        <Table style={{backgroundColor: "rgba(54, 54, 54, .3)"}} multiSelectable
                               onRowSelection={(val)=>this.selectedRow(val)}
                        >
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn style={{width: "200px"}}>Date</TableHeaderColumn>
                                    <TableHeaderColumn>User</TableHeaderColumn>
                                    <TableHeaderColumn>Status</TableHeaderColumn>
                                    <TableHeaderColumn style={{width: "80px"}}>Details</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody deselectOnClickaway={false}>
                                {list}
                            </TableBody>
                        </Table>
                        <div className="sumReport">
                            <i className="material-icons">info_outline</i>
                            <div>
                                Summary reports price is {list.length * this.props.company.orderValue}
                            </div>
                        </div>
                    </div>
                )}
                <Snackbar
                    bodyStyle={{backgroundColor: "rgba(54, 54, 54, .3)", textAlign: "center"}}
                    contentStyle={{color: "#000", fontFamily: 'Neucha', fontSize: "18px"}}
                    open={this.state.rows.length > 0}
                    action="Paid"
                    message={this.state.rows.length + " reports where selected for the amount of " + this.state.rows.length * this.props.company.orderValue}
                    autoHideDuration={4000}
                    onActionClick={() =>this.allPaid()}
                />
                <ToastContainer/>
            </div>
        )
    }
}

export default connect(store => ({
    reports: store.report_info,
    users: store.user_info,
    reportFilter: store.filter_list,
    company: store.data_company
}))(withRouter(Reports))