import React from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {NavLink} from "react-router-dom";


const SideNavBar = () => {
    return (
            <React.Fragment>
                <SideNav
                    // onSelect={(selected) => {
                    //     const to = '/' + selected;
                    //     if (location.pathname !== to) {
                    //         history.push(to);
                    //     }
                    // }}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon />
                            <NavText><NavLink exact to="/">Home</NavLink></NavText>
                        </NavItem>
                        <NavItem eventKey="project">
                            <NavIcon/>
                            <NavText><NavLink exact to="/project">Project</NavLink></NavText>
                        </NavItem>
                        <NavItem eventKey="addResource">
                            <NavIcon/>
                           <NavText> <NavLink exact to="/addResource">Add Resource</NavLink></NavText>
                        </NavItem>
                        <NavItem eventKey="editColumn">
                            <NavIcon/>
                            <NavText> <NavLink exact to="/editColumn">Edit Column</NavLink></NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </React.Fragment>
    )
}

export default SideNavBar;