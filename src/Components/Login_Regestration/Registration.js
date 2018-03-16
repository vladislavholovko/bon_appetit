import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
//-------------
import {ToastContainer, toast} from 'react-toastify';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as styles from './style';
//-------------


const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            ownerEmail: "",
            ownerPassword: "",
            orderValue: 100,
            imageQuality: "low",
            language: "English"
        };
        this.singUp = this.singUp.bind(this);
    }

    singUp() {
        try {
            if (this.state.name.length <= 3) throw new Error('Company name must be at least 3 characters');
            if (this.state.description.length < 16) throw new Error('Company description must be at least 16 characters');
            if (!emailRegex.test(this.state.ownerEmail)) throw new Error('Email is invalid');
            if (this.state.ownerPassword.length < 6) throw new Error('Password must be at least 6 characters');
            if (isNaN(this.state.orderValue)) throw new Error('Report value is invalid. Must be a number');

            fetch("http://web.bidon-tech.com:65059/company",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        name: this.state.name,
                        ownerEmail: this.state.ownerEmail,
                        ownerPassword: this.state.ownerPassword,
                        description: this.state.description,
                        logo: "myLogo",
                        imageQuality: this.state.imageQuality,
                        orderValue: this.state.orderValue,
                        active: true,
                        language: this.state.language
                    })
                })
                .then((response) => response.json())
                .then((res) => {
                    if (res.error) {
                        toast.error(res.message.toString());
                    } else {
                        this.props.history.push('/')
                    }
                });
        }
        catch (e) {
            toast.error(e.message);
        }
    }

    render() {
        return (
                <div className="registrationContainer">
                    <div className="registrationHeader">
                        <img src={require("../../Sources/logo.png")} alt=""/>
                        <h3>Bon Appetit</h3>
                    </div>
                    <div className="registrationForm">
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
                        <FlatButton
                            label="SIGN UP"
                            fullWidth={true}
                            labelStyle={styles.floatingLabelStyle}
                            onClick={this.singUp}/>
                        <ToastContainer/>
                    </div>
                </div>
        )
    }
}

export default connect(store => ({store: store}))(withRouter(Registration))