import React, {Fragment, useState, useEffect, useRef} from "react";
import { NavLink } from 'react-router-dom';
import userService from "../../infrastructure/userService";
import OutsideClickHandler from 'react-outside-click-handler';



const NavBar = (props) => {

    // const isAdmin = userService.isAdmin();
    // const isRoot = userService.isRoot();
    // const userId = userService.getUserId();
    const [show, setShow] = useState(false)
    const { loggedIn, onLogout} = props;

    return (
        <Fragment >
            <header className="site-header">
                <section className="navbar-section">
                    <div className="navbar-wrapper">
                        <div className="nav-searchbar-container">
                            <div className="site-logo">
                                <NavLink to="/" className="nav-link " >ResourceManagement</NavLink>
                            </div>
                        </div>

                        <nav className="nav-main" >
                            <ul className="nav-ul" >
                                {loggedIn && <li className="nav-item"><NavLink exact to="#" className="nav-link  fas fa-user tooltipCustom" onClick={()=>setShow(true)}> {userService.getUsername()}</NavLink>
                                    {<OutsideClickHandler onOutsideClick={()=> setShow(false)}>{show && <span>{userService.getUsername()}</span>}</OutsideClickHandler>}</li>}
                                {loggedIn && <li className="nav-item"><NavLink exact to="#" className="nav-link " onClick={onLogout} >Logout</NavLink></li>}
                                {!loggedIn && <li className="nav-item"><NavLink exact to="/login" className="nav-link" >Login</NavLink></li>}
                                {!loggedIn && <li className="nav-item"><NavLink exact to="/register" className="nav-link" >Register</NavLink></li>}
                            </ul>
                        </nav>
                    </div>
                </section>
            </header>
        </Fragment >
    )
}

export default NavBar;