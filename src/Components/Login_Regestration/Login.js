import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
//-----------------
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import * as styles from './style';
import {ToastContainer, toast} from 'react-toastify';
//-----------------
import * as AutReg from '../../Actions/AutRes';

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

    signIn(e) {
        e.preventDefault();
        AutReg.autorization(this.state.ownerEmail, this.state.ownerPassword)
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    toast.error(res.message);
                } else {
                    localStorage.setItem('token',res.message.token);
                    this.props.history.push('/panel');
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
                    <form className="loginForm" autoComplete="off" onSubmit={this.signIn}>
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
                            type="submit"
                        />
                    </form>
                    <p className="loginInfo">You don't have an account?
                        <Link className="Link" to="/registration">Sign Up</Link>
                        your company</p>
                    <ToastContainer/>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)