// import logo from './logo.svg';
import './App.css';
import React, { Component, Fragment, lazy, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Navbar from './components/homePage/NavBar';
import { ToastComponent } from './components/common'
import { userService } from './infrastructure';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { CircleLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { connect } from 'react-redux';
import {RoundedCorner} from "@material-ui/icons";

const logoutAction = require('./store/actions').logout();
const StartPage = lazy(() => import('./components/authPage/StartPage'))
const RegisterPage = lazy(() => import('./components/authPage/Register'))
const LoginPage = lazy(() => import('./components/authPage/Login'))
const ProjectPage = lazy(() => import('./components/homePage/Project'))


const override = css`
        display: block;
        margin: 8rem auto;
        border-color: red;
`;


class App extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }


    onLogout() {
        this.props.logout();

        // eslint-disable-next-line react/jsx-pascal-case
        toast.success(<ToastComponent.successToast text={`You have been successfully logged out.`} />, {
            position: toast.POSITION.TOP_RIGHT
    });

    this.props.history.push('/login');
    }

    render() {
    const loggedIn = userService.isTheUserLoggedIn();
    // let routes = (
    //     <Switch>
    //         <Route exact path="/" component={StartPage} />
    //       {<Route exact path="/register" component={RegisterPage} />}
    //       {<Route exact path="/login" component={LoginPage} />}
    //       <Redirect to="/" />
    //     </Switch>
    // );
    //
    // if ( loggedIn ) {
    //     routes = (
    //       <Switch>
    //         <Route exact path="/" component={StartPage} />
    //         <Redirect to="/" />
    //       </Switch>
    //     );
    // }
    return (
        <Fragment>
            <Navbar loggedIn={localStorage.getItem('token') != null} onLogout={this.onLogout}{...this.props} />
          <ToastContainer transition={Zoom} closeButton={false} />
          <Suspense fallback={
            <div className='sweet-loading'>
              <CircleLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={'#61dafb'}
                  loading={true}
              />
            </div>}>
              <Switch>
                  <Route exact path="/" component={StartPage} />
                  {!loggedIn && <Route exact path="/register" component={RegisterPage} />}
                  {!loggedIn && <Route exact path="/login" component={LoginPage} />}
                  {loggedIn && <Route exact path={"/project"} component={ProjectPage}/>}
                  {loggedIn && <Route exact path={"/project/resource"} component={ProjectPage}/>}
                  {loggedIn && <Route exact path={"/project/select"} component={ProjectPage}/>}

              </Switch>
              {/*<Route exact path="/error" component={ErrorPage} />*/}
              {/*<Route component={ErrorPage} />*/}
          </Suspense>
          {/*<Footer />*/}
        </Fragment>
    )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logoutAction),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
