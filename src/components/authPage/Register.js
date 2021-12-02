import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import { ToastComponent } from '../common';
import { connect } from 'react-redux';
import { registerAction, redirectAction } from '../../store/actions'
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, InputAdornment} from "@material-ui/core";
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            touched: {
                username: false,
                email: false,
                password: false,
                confirmPassword: false,
                hiddenPass: false,
                hiddenConfirmPass:false
            }
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onShowPassword = this.onShowPassword.bind(this);
        this.onShowConfirmPassword = this.onShowConfirmPassword.bind(this);
    }

    componentDidUpdate(prevProps, prevState, _prevContext){
        if (this.props.registerError != null && prevProps.registerError !== this.props.registerError) {
            toast.error(<ToastComponent.errorToast text={this.props.registerError} />, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (this.props.registerSuccess) {
            this.props.redirect();

            toast.success(<ToastComponent.successToast text={"Successful sign-up!"} />, {
                position: toast.POSITION.TOP_RIGHT
            });

            this.props.history.push('/login');
        }
    }

    onChangeHandler(event) {
        // console.log(event);
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    onShowPassword(hidden) {
        this.setState({touched:{hiddenPass: !this.state.touched.hiddenPass}});
    }

    onShowConfirmPassword(hidden) {
        this.setState({touched:{hiddenConfirmPass: !this.state.touched.hiddenConfirmPass}});
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (!this.canBeSubmitted()) {
            return;
        }

        const { touched, ...otherProps } = this.state;
        this.props.register(otherProps)
    }

    canBeSubmitted() {
        const { username, email, password, confirmPassword} = this.state;
        const errors = this.validate(username, email, password, confirmPassword);
        const isDisabled = Object.keys(errors).some(x => errors[x])
        return !isDisabled;
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });

    }

    validate = (username, email, password, confirmPassword) => {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const userNameRegex =/^([0-9a-zA-Z]+)?$/
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.,!@#$%^&+=])(?=\S+$).{8,30}$/
        const testUsername = userNameRegex.test(username)
        const testPassword = passwordRegex.test(password)
        const testEmail = emailRegex.test(email)
        return {
            username: username.length < 4 || username.length > 16 || !testUsername,
            email: email.length === 0 || !testEmail,
            password: password.length < 8 || password.length > 30 || !testPassword,
            confirmPassword: confirmPassword.length === 0 || confirmPassword !== password,
        }
    }

    render() {
        const { username, email, password, confirmPassword } = this.state;
        const errors = this.validate(username, email, password, confirmPassword);
        const isEnabled = !Object.keys(errors).some(x => errors[x])

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        }

        return (
            <Fragment>
                <section className="pt-3">
                    <div className="container register-form-content-section pb-4 ">
                        <h1 className="text-center font-weight-bold mt-4" style={{ 'margin': '1rem auto', 'paddingTop': '2rem' }}>Register</h1>
                        <div className="hr-styles" style={{ 'width': '70%' }}/>

                        <form className="Register-form-container" onSubmit={this.onSubmitHandler}>

                            <div className="section-container">
                                <section className="register-section">
                                    <div className="form-group">
                                        <label htmlFor="username" >Username</label>
                                        <input
                                            type="text"
                                            className={"form-control " + (shouldMarkError('username') ? "error" : "")}
                                            id="username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('username')}
                                            aria-describedby="usernameHelp"
                                            placeholder="Enter username"
                                        />
                                        {shouldMarkError('username') && <small id="usernameHelp" className="form-text alert alert-danger"> {(!this.state.username ? 'Username is required!' : 'Username should be at least 4 and maximum 16 characters or number long!')}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email" >Email Address</label>
                                        <input
                                            type="email"
                                            className={"form-control " + (shouldMarkError('email') ? "error" : "")}
                                            id="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('email')}
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email"
                                        />
                                        {shouldMarkError('email') && <small id="emailHelp" className="form-text alert alert-danger">{(!this.state.email ? 'Email is required!' : 'Invalid e-mail address!')}</small>}
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="password" >Password</label>
                                        <Input
                                            type={this.state.touched.hiddenPass ? "text":"password"}
                                            className={"form-control " + (shouldMarkError('password') ? "error" : "")}
                                            id="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('password')}
                                            aria-describedby="passwordHelp"
                                            placeholder="Enter password"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.onShowPassword}>
                                                        {this.state.touched.hiddenPass ? <VisibilityOff />:<Visibility />}
                                                    </IconButton>
                                                </InputAdornment>}
                                        />
                                        {shouldMarkError('password') && <small id="passwordHelp" className="form-text alert alert-danger">{(!this.state.password ? 'Password is required!' : 'Password should be at least 8 and maximum 30 characters long, and should contain number, upper case and lower case alphabet, special character!')}</small>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirmPassword" >Confirm Password</label>
                                        <Input
                                            type={this.state.touched.hiddenConfirmPass ? "text":"password"}
                                            className={"form-control " + (shouldMarkError('confirmPassword') ? "error" : "")}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.onChangeHandler}
                                            onBlur={this.handleBlur('confirmPassword')}
                                            aria-describedby="confirmPasswordHelp"
                                            placeholder="Confirm your password"
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.onShowConfirmPassword}>
                                                        {this.state.touched.hiddenConfirmPass ? <VisibilityOff />:<Visibility />}
                                                    </IconButton>
                                                </InputAdornment>}
                                        />
                                        {shouldMarkError('confirmPassword') && <small id="confirmPasswordHelp" className="form-text alert alert-danger">Passwords do not match!</small>}
                                    </div>

                                </section>
                            </div>

                            <div className="text-center">
                                <button disabled={!isEnabled} type="submit" className="btn App-button-primary btn-lg m-3">Register</button>
                            </div>
                        </form>
                    </div>

                </section>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        registerSuccess: state.register.success,
        registerError: state.register.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (userData) =>
            dispatch(registerAction(userData)),
        redirect: () => dispatch(redirectAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);