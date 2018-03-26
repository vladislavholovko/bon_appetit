import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
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
//------------
import * as UsAct from "../../Actions/UserActions";
import * as styles from "../Login_Regestration/style";

//------------
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const defaultValue = {open: false, edit: false, search:"", fullName: '', email: '', password: '', confirmPassword: ''};

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            edit: false,
            search:"",
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        this.companyUsers = this.companyUsers.bind(this);
    }

    componentDidMount() {
        UsAct.UserInfo();
    }

//-----------------------------
    handleOpen = () => {
        this.setState({open: true});
    };

    editOpen = (value) => {
        value.password = "";
        value.confirmPassword = "";
        this.setState({...value, edit: true, open: true});
    };

    handleClose = () => {
        this.setState(defaultValue);
    };

//-----------------------------
    companyUsers() {
        try {
            if (this.state.fullName.length < 3) throw new Error('Full name must be at least 3 characters');
            if (!emailRegex.test(this.state.email)) throw new Error('Email is invalid');
            if (this.state.password.length < 6) throw new Error('Password must be at least 6 characters');
            if (this.state.password !== this.state.confirmPassword) throw new Error('Passwords is invalid');
            //------------
            this.state.edit ?
                UsAct.EditUsers(this.state._id, this.state.fullName, this.state.email, this.state.password, this.state.active) :
                UsAct.NewUsers(this.state.fullName, this.state.email, this.state.password);
            toast.success('User has been created successfully');
            this.setState(defaultValue);
        }
        catch (e) {
            toast.error(e.message);
        }
    }

    usersToggle(value) {
        value.active = !value.active;
        UsAct.EditUsers(value._id, value.fullName, value.email, value.password, value.active);
        toast.success('User has been updated successfully');
    }

    searchUsers (){
        let sList = this.props.users.filter((val) => {
            let mTitle = val.fullName;
            return mTitle.indexOf(this.state.search) !== -1;
        });
        return sList
    }

//-----------------------------
    dialog() {
        return (
            <Dialog
                contentStyle={{width: "350px"}}
                title={this.state.edit ? "Edit user" : "Add new user"}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}>
                <div className="dialogText">
                    <TextField
                        hintText="Enter user full name"
                        floatingLabelText="Full name"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        inputStyle={styles.floatingLabelStyle}
                        value={this.state.fullName}
                        onChange={(e) => this.setState({fullName: e.target.value})}/>
                    <TextField
                        hintText="Enter user email"
                        floatingLabelText="E-mail"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        inputStyle={styles.floatingLabelStyle}
                        value={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})}/>
                    <TextField
                        hintText="Enter user password"
                        floatingLabelText="Password"
                        type="password"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}/>
                    <TextField
                        hintText="Enter user password confirm"
                        floatingLabelText="Password confirm"
                        type="password"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        value={this.state.confirmPassword}
                        onChange={(e) => this.setState({confirmPassword: e.target.value})}/>
                </div>
                <div className="dialogButton">
                    <FlatButton
                        label="CANCEL"
                        primary={true}
                        onClick={this.handleClose}
                        labelStyle={styles.floatingLabelStyle}
                    />
                    <FlatButton
                        label="SUBMIT"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.companyUsers}
                        labelStyle={styles.floatingLabelStyle}
                    />
                </div>
            </Dialog>
        )
    }

//-----------------------------
    render() {
        let sUser = this.state.search.length === 0? this.props.users:this.searchUsers();
        let list = sUser.map((value, index) => {
            return (
                <TableRow key={index}>
                    <TableRowColumn>{value.fullName}</TableRowColumn>
                    <TableRowColumn>{value.email}</TableRowColumn>
                    <TableRowColumn>
                        <Toggle
                            toggled={value.active}
                            onToggle={() => this.usersToggle(value)}/>
                    </TableRowColumn>
                    <TableRowColumn style={{width: "45px"}}>
                        <IconButton
                            children={<i className=" material-icons">mode_edit</i>}
                            onClick={() => this.editOpen(value)}
                        />
                    </TableRowColumn>
                </TableRow>
            )
        });
        //---------------
        return (
            <div className="usersBody">
                <div className="userPanel">
                    {this.dialog()}
                    <FlatButton label="+ ADD NEW USER" backgroundColor="cyan" style={{borderRadius: "5px"}}
                                onClick={this.handleOpen}/>
                    <TextField
                        hintText="Search"
                        value={this.state.search}
                        onChange={(e) => this.setState({search: e.target.value})}
                        inputStyle={{color: "#000", fontFamily: 'Neucha', fontSize: "24px"}}/>
                </div>
                {/*-----*/}
                {list.length === 0 ? (
                    <div className="userInfo"><b>Users list is empty</b></div>
                ) : (
                    <div className="userList">
                        <Table style={{backgroundColor: "rgba(54, 54, 54, .3)"}}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Full name</TableHeaderColumn>
                                    <TableHeaderColumn>Email</TableHeaderColumn>
                                    <TableHeaderColumn>Status</TableHeaderColumn>
                                    <TableHeaderColumn style={{width: "45px"}}>Actions</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {list}
                            </TableBody>
                        </Table>
                        <p className="ListUsers">All {list.length} users are listed</p>
                    </div>
                )
                }
                {/*-----*/}
                <ToastContainer/>
            </div>
        )
    }
}

export default connect(store => ({users: store.user_info}))(withRouter(Users))