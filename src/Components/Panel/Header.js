import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
//------------
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//------------
import * as Info from '../../Actions/actionInfo'
//------------
import * as styles from "../Login_Regestration/style";

//------------
const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        };
        this.logout = this.logout.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        Info.infoCompany();
    }
    //-----------------------------
    handleOpen = () => {
        let info = this.props.company;
        info.ownerPassword = "";
        this.setState({...info, open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    onSubmit () {
        try {
            if (this.state.name.length <= 3) throw new Error('Company name must be at least 3 characters');
            if (this.state.description.length < 16) throw new Error('Company description must be at least 16 characters');
            if (!emailRegex.test(this.state.ownerEmail)) throw new Error('Email is invalid');
            if (this.state.ownerPassword.length < 6) throw new Error('Password must be at least 6 characters');
            if (isNaN(this.state.orderValue)) throw new Error('Report value is invalid. Must be a number');
            //------------
            let company = {...this.state};
            Info.changeCompany(company);
            this.setState({open: false});
        }
        catch (e) {
            toast.error(e.message);
        }
    }

    //-----------------------------
    logout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    dialog() {
        return (
            <Dialog
                titleClassName="dialogTitle"
                bodyClassName="dialogBody"
                contentStyle={{width: "350px"}}
                title="Setting"
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}>
                <div className="dialogText">
                    <TextField
                        hintText="You company name"
                        floatingLabelText="Company name"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        inputStyle={styles.floatingLabelStyle}
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}/>
                    <TextField
                        hintText="A few words about your company"
                        floatingLabelText="Company description"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        inputStyle={styles.floatingLabelStyle}
                        multiLine={true}
                        rows={2}
                        rowsMax={7}
                        value={this.state.description}
                        onChange={(e) => this.setState({description: e.target.value})}/>
                    <TextField
                        hintText="Your email"
                        floatingLabelText="E-mail"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        inputStyle={styles.floatingLabelStyle}
                        value={this.state.ownerEmail}
                        onChange={(e) => this.setState({ownerEmail: e.target.value})}/>
                    <TextField
                        hintText="Your password"
                        floatingLabelText="Password"
                        type="password"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        value={this.state.ownerPassword}
                        onChange={(e) => this.setState({ownerPassword: e.target.value})}/>
                    <TextField
                        hintText="Yours value per report"
                        floatingLabelText="Report value"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        inputStyle={styles.floatingLabelStyle}
                        value={this.state.orderValue}
                        onChange={(e) => this.setState({orderValue: e.target.value})}/>
                    <SelectField
                        value={this.state.imageQuality}
                        onChange={(event, index, value) => this.setState({imageQuality: value})}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelText="Photo resolution">
                        <MenuItem value={"low"} primaryText="Low"/>
                        <MenuItem value={"medium"} primaryText="Medium"/>
                        <MenuItem value={"high"} primaryText="High"/>
                    </SelectField>
                    <SelectField
                        value={this.state.language}
                        onChange={(event, index, value) => this.setState({language: value})}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelText="Language">
                        <MenuItem value={"English"} primaryText="English"/>
                        <MenuItem value={"Українська"} primaryText="Українська"/>
                    </SelectField>
                </div>
                <div className="dialogButton">
                    <FlatButton
                        label="Close"
                        primary={true}
                        onClick={this.handleClose}
                        labelStyle={styles.floatingLabelStyle}
                    />
                    <FlatButton
                        label="Save"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.onSubmit}
                        labelStyle={styles.floatingLabelStyle}
                    />
                </div>
                <ToastContainer/>
            </Dialog>
        )
    }

    render() {
        return (
            <div className="headerBody">
                {this.dialog()}
                <ul className="headerList">
                    <li onClick={this.handleOpen}>
                        <h2>{this.props.company.name}</h2>
                        <i className="material-icons">settings</i>
                    </li>
                    <li>
                        <i className="material-icons" onClick={this.logout}>exit_to_app</i>
                    </li>
                </ul>
            </div>

        )
    }
}

export default connect(store => ({company: store.data_company}))(withRouter(Header))