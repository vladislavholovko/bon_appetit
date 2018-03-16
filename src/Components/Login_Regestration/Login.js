import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
//-----------------
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as styles from './style';
import {ToastContainer, toast} from 'react-toastify';
//-----------------
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            ownerEmail: "",
            ownerPassword: ""
        };
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount(){
        if (localStorage.getItem('token')!==null){
            this.props.history.push('/panel');
        }
    };

    signIn() {
        fetch("http://web.bidon-tech.com:65059/company/login",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    ownerEmail: this.state.ownerEmail,
                    ownerPassword: this.state.ownerPassword,
                })
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    toast.error(res.message);
                } else {
                    localStorage.setItem('token',res.message.token);
                    this.props.history.push('/panel');
                    toast.success("Success");
                }
            });
    }

    render() {
        return (
            <div className="loginBody">
                <div className="loginContainer">
                    <div className="loginHeader">
                        <img src={require("../../Sources/logo.png")} alt=""/>
                        <h3>Bon Appetit</h3>
                    </div>
                    <div className="loginForm">
                        <TextField
                            hintText="Enter your email"
                            floatingLabelText="Email"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            inputStyle={styles.floatingLabelStyle}
                            value={this.state.ownerEmail}
                            onChange={(e) => this.setState({ownerEmail: e.target.value})}
                        />
                        <TextField
                            hintText="Enter your password"
                            floatingLabelText="Password"
                            type="password"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            value={this.state.ownerPassword}
                            onChange={(e) => this.setState({ownerPassword: e.target.value})}
                        />
                        <FlatButton
                            label="SIGN IN"
                            fullWidth={true}
                            labelStyle={styles.floatingLabelStyle}
                            onClick={this.signIn}
                        />
                    </div>
                    <p className="loginInfo">You don't have an account?
                        <a onClick={() => this.props.history.push('/registration')}> Sign up </a>
                        your company</p>
                    <ToastContainer/>
                </div>
            </div>
        )
    }
}
export default connect(store => ({store: store}))(withRouter(Login))