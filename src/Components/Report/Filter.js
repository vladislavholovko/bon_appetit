import React from "react";
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
//------------
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
//------------
import {ReportFilter} from "../../Actions/FilterAction";
//------------
class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            id: ""
        };
    }

    componentDidMount() {
        ReportFilter(this.state.reports)
    }

    searchReports() {
        if (this.state.id === "all") {
            ReportFilter(this.props.reports);
        } else {
            let rList = this.props.reports.filter((val) => {
                return val.user_id === this.state.id;
            });
            ReportFilter(rList);
        }
    }

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
                        <FlatButton backgroundColor="rgba(112, 252, 255, 0.4)"
                                    hoverColor="rgba(112, 252, 255, 0.8)"
                                    label="REFRESH"
                                    onClick={() => this.searchReports()}/>
                        <FlatButton label="CLEAR" onClick={() => this.setState({id: "all"}, () => this.searchReports())}/>
                    </div>
                </div>
                <div className="reportExport">
                    <div style={{margin: "2px 0"}}>
                        <FlatButton backgroundColor="rgba(142, 141, 141, 0.2)"
                                    hoverColor="rgba(142, 141, 141, 0.5)"
                                    icon={<i className="material-icons">file_download</i>} label="XLS"/>
                    </div>
                    <div style={{margin: "2px 0"}}>
                        <FlatButton backgroundColor="rgba(142, 141, 141, 0.2)"
                                    hoverColor="rgba(142, 141, 141, 0.5)"
                                    icon={<i className="material-icons">file_download</i>} label="CSV"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(store => ({reports: store.report_info, users: store.user_info}))(Filter)