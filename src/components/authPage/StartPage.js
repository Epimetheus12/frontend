import React from 'react';
import { NavLink } from 'react-router-dom';
import userService from '../../infrastructure/userService';
// import './css/startPage.css';

const StartPage = () => {
    const isAdmin = userService.isAdmin();
    const isRoot = userService.isRoot();
    const currentUserId = userService.getUserId();
    // console.log(userService.isTheUserLoggedIn());
    let StartPageView;

    if (!localStorage.getItem('token')) {
        StartPageView = (
            <div style={{'margin-left': '30%'}}>
                <div className="container text-center start-page-margin" style={{'text-align': 'center'}}>
                    <div className="jumbotron bg-light text-dark text-center mb-0 mt-5 mx-auto jumbo-wrapper" style={{ 'boxShadow': '0 0 14px 1px rgba(0, 0, 0, 0.3)', width:'60%' }}>
                        <h2 className="h1 h1-responsive" style={{'text-align': 'center'}}>Welcome!</h2>
                        <div className="hr-styles" style={{'width': '70%'}}/>
                        <p className="lead" style={{'marginBottom': '1.5rem', 'fontWeight': '600', 'text-align': 'center'}}>Please <NavLink className="text-info" exact to="/login">Login</NavLink> or <NavLink className="text-info" exact to="/register">Register</NavLink> if you don't have an account.</p>
                        <div className="hr-styles" style={{'width': '70%'}}/>
                        <p className="lead">
                            <NavLink className="btn App-button-primary btn-lg m-3" to="/login" role="button">Login</NavLink>
                            <NavLink className="btn App-button-primary btn-lg m-3" to="/register" role="button">Register</NavLink>
                        </p>
                    </div>
                </div>
            </div >
        )
    } else {
        StartPageView = (
            <div style={{'margin-left': '30%'}}>
                <div className="container text-center start-page-margin" style={{'text-align': 'center'}}>
                    <div className="jumbotron bg-light text-dark text-center mb-0 mt-5 jumbo-wrapper" style={{ 'boxShadow': '0 0 14px 1px rgba(0, 0, 0, 0.3)', width:'60%' }}>
                        <h3 className="md-display-5 h3 h3-responsive mb-3" style={{'text-align': 'center'}}>Hello {userService.getUsername()}!</h3>
                        <div className="hr-styles" style={{'width': '80%', 'text-align': 'center'}}/>
                        <h2 className="h1 h1-responsive" style={{'text-align': 'center'}}>Welcome!</h2>
                        <div className="hr-styles" style={{'width': '80%', 'text-align': 'center'}}/>
                        {/*<p className="lead">*/}
                        {/*    <NavLink className="btn App-button-primary btn-lg m-3" to={`/project/${currentUserId}`} role="button">Profile</NavLink>*/}
                        {/*    {(isAdmin || isRoot) && <NavLink className="btn App-button-primary btn-lg m-3" to={`/project/all`} role="button">All Projects</NavLink>}*/}
                        {/*</p>*/}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container text-center pt-5">
            {StartPageView}
        </div>

    )
}

export default StartPage;