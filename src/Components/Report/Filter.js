import React from "react";
import {connect} from 'react-redux';
//------------
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
//------------
import * as usReport from "../../Actions/FilterAction";
import dateFormat from "dateformat";

//------------
class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "all",
            timeFrom: {},
            timeTo: {}
        };
        this.searchReports = this.searchReports.bind(this)
    }

    componentDidMount() {
        usReport.ReportFilter()
    }
//-----------------------------
    searchReports() {
        let timeFrom = Object.keys(this.state.timeFrom).length === 0 && this.state.timeFrom.constructor === Object ?
            null :
            dateFormat(this.state.timeFrom, "yyyy-mm-dd HH:MM");
        let timeTo = Object.keys(this.state.timeTo).length === 0 && this.state.timeTo.constructor === Object ?
            null :
            dateFormat(this.state.timeTo, "yyyy-mm-dd HH:MM");


        if (this.state.id === "all" && timeFrom === null && timeTo === null) {
            usReport.ReportFilter(this.props.reports);
        } else if (this.state.id === "all" && timeFrom !== null && timeTo === null) {
            let rList = this.props.reports.filter((val) => {
                return timeFrom <= dateFormat(val.date, "yyyy-mm-dd HH:MM");
            });
            usReport.ReportFilter(rList);
        } else if (this.state.id === "all" && timeFrom !== null && timeTo !== null) {
            let rList = this.props.reports.filter((val) => {
                return timeFrom <= dateFormat(val.date, "yyyy-mm-dd HH:MM") && timeTo >= dateFormat(val.date, "yyyy-mm-dd HH:MM");
            });
            usReport.ReportFilter(rList);
        } else if (this.state.id === "all" && timeFrom === null && timeTo !== null) {
            let rList = this.props.reports.filter((val) => {
                return timeTo >= dateFormat(val.date, "yyyy-mm-dd HH:MM");
            });
            usReport.ReportFilter(rList);
        } else if (this.state.id !== "all" && timeFrom === null && timeTo === null) {
            let rList = this.props.reports.filter((val) => {
                return val.user_id === this.state.id;
            });
            usReport.ReportFilter(rList);
        } else if (this.state.id !== "all" && timeFrom !== null && timeTo === null) {
            let rList = this.props.reports.filter((val) => {
                return val.user_id === this.state.id && timeFrom <= dateFormat(val.date, "yyyy-mm-dd HH:MM");
            });
            usReport.ReportFilter(rList);
        } else  if (this.state.id !== "all" && timeFrom !== null && timeTo !== null) {
            let rList = this.props.reports.filter((val) => {
                return val.user_id === this.state.id && timeFrom <= dateFormat(val.date, "yyyy-mm-dd HH:MM") && timeTo >= dateFormat(val.date, "yyyy-mm-dd HH:MM");
            });
            usReport.ReportFilter(rList);
        } else if (this.state.id !== "all" && timeFrom === null && timeTo !== null) {
            let rList = this.props.reports.filter((val) => {
                return val.user_id === this.state.id && timeTo >= dateFormat(val.date, "yyyy-mm-dd HH:MM");
            });
            usReport.ReportFilter(rList);
        }
    }

    clearFilter() {
        this.setState({ id: "all", timeFrom: {}, timeTo: {} });
        usReport.ReportFilter(undefined);
    }

//-----------------------------
    render() {
        return (
            <div className="reportPanel">
                <div className="reportFilter">
                    <div className="filterName">
                        <h1>FILTER</h1>
                    </div>
                    <div className="selectFilter">
                        <SelectField
                            value={this.state.id}
                            onChange={(event, index, value) => this.setState({id: value})}
                            floatingLabelStyle={{color: "#000", fontFamily: 'Neucha', fontSize: "18px"}}
                            selectedMenuItemStyle={{width: "200px"}}
                            floatingLabelText="Users">
                            <MenuItem value={"all"} primaryText="All users"/>
                            {this.props.users.map((value, index) => {
                                return (<MenuItem key={index} value={value._id} primaryText={value.fullName}/>)
                            })}
                        </SelectField>
                        <DatePicker
                            value={this.state.timeFrom}
                            onChange={(key, index) => this.setState({timeFrom: index})}
                            floatingLabelText="Date from"
                            mode="landscape"
                            textFieldStyle={{color: "#000", fontFamily: 'Neucha', fontSize: "18px", width: "100px"}}
                            dialogContainerStyle={{fontFamily: 'Neucha', fontSize: "18px"}}

                        />
                        <DatePicker
                            value={this.state.timeTo}
                            onChange={(key, index) => this.setState({timeTo: index})}
                            floatingLabelText="Date to"
                            mode="landscape"
                            textFieldStyle={{color: "#000", fontFamily: 'Neucha', fontSize: "18px", width: "100px"}}
                            dialogContainerStyle={{fontFamily: 'Neucha', fontSize: "18px"}}
                        />
                        <FlatButton backgroundColor="rgba(112, 252, 255, 0.4)"
                                    hoverColor="rgba(112, 252, 255, 0.8)"
                                    label="REFRESH"
                                    onClick={() => this.searchReports()}/>
                        <FlatButton label="CLEAR"
                                    onClick={() => this.clearFilter()}/>
                    </div>
                </div>
                <div className="reportExport">
                    <div style={{margin: "2px 0"}}>
                        <FlatButton backgroundColor="rgba(142, 141, 141, 0.2)"
                                    hoverColor="rgba(142, 141, 141, 0.5)"
                                    icon={<i className="material-icons">file_download</i>} label="XLS"
                                    onClick={()=> usReport.saveXls()}
                        />
                    </div>
                    <div style={{margin: "2px 0"}}>
                        <FlatButton backgroundColor="rgba(142, 141, 141, 0.2)"
                                    hoverColor="rgba(142, 141, 141, 0.5)"
                                    icon={<i className="material-icons">file_download</i>} label="CSV"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(store => ({reports: store.report_info, users: store.user_info}))(Filter)