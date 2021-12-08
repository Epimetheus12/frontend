import React, {Fragment, useState, useEffect, useRef} from "react";
import { NavLink } from 'react-router-dom';
import userService from "../../infrastructure/userService";
import {Popover} from '@geist-ui/react';

import './css/NavBar.css';

import SlideMenu from './SlideMenu';

const NavBar = (props) => {

    // const isAdmin = userService.isAdmin();
    // const isRoot = userService.isRoot();
    // const userId = userService.getUserId();
    const [show, setShow] = useState(false)
    const { loggedIn, onLogout} = props;

    const content = () => (
        <div style={{ padding: '0 20px' }}>
            <div>
            <span>Username: {userService.getUsername()}</span>
            </div>
            <div>
            <span>CreatedTime: {userService.getCreatedTime()}</span>
            </div>
        </div>
    )

    return (
        <Fragment >
            <header className="site-header">
                <section className="navbar-section">
                    <div className="navbar-wrapper">
                        {loggedIn && <SlideMenu />}
                        <div className="nav-logo-container">

                            <NavLink to="/" className="nav-link " style={{'text-decoration': 'none', color: "white"}}>Resource&nbsp;Management</NavLink>

                        </div>

                        <div className="nav-main" >
                            <ul className="nav-ul" >
                                {loggedIn && <li className="nav-item"><Popover content={content}><NavLink exact to="#" className="nav-link  fas fa-user tooltipCustom" onClick={()=>setShow(true)}> {userService.getUsername()}</NavLink> </Popover>
                                    </li>}
                                {loggedIn && <li className="nav-item"><NavLink exact to="#" className="nav-link " onClick={onLogout} >Logout</NavLink></li>}
                                {!loggedIn && <li className="nav-item"><NavLink exact to="/login" className="nav-link" >Login</NavLink></li>}
                                {!loggedIn && <li className="nav-item"><NavLink exact to="/register" className="nav-link" >Register</NavLink></li>}
                            </ul>
                        </div>
                    </div>
                </section>
            </header>
        </Fragment >
    )
}

export default NavBar;