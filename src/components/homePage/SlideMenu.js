import React,{Component, Fragment} from "react";
import { NavLink } from 'react-router-dom';
import {IconButton} from "@material-ui/core";
import OutsideClickHandler from 'react-outside-click-handler';
import "bootstrap-icons/font/bootstrap-icons.css"
import "./css/slideMenu.css"

class SlideMenu extends Component{

    constructor(props) {
        super(props);

        this.state = {
            menuShow: false,
            visibility: 'hide'
        }

        // this.handleClick = this.handleClick.bind(this);
        this.onClickIcon = this.onClickIcon.bind(this);
    }

    // handleClick(e) {
    //     this.onClickIcon();
    //
    //     // console.log("clicked");
    //     e.stopPropagation();
    // }

    onClickIcon(show, visibility){
        this.setState({menuShow: show, visibility: visibility})
    }



    render() {
        const {menuShow} = this.state
        return(
            <Fragment>
                {!menuShow && <div>
                    <IconButton className="iconButton" onClick={() => this.onClickIcon(true, 'show')}>
                        <i className="bi bi-list"/>
                    </IconButton>
                </div>}
                <OutsideClickHandler onOutsideClick={()=> this.onClickIcon(false, 'hide')}>
                    {menuShow && <div id="slideMenu" className={this.state.visibility} onClick={() => this.onClickIcon(true, 'show')}>

                        <span className='menu-span'><NavLink exact to="/">Home</NavLink></span>
                        <span className='menu-span'><NavLink exact to="/project">Project</NavLink></span>
                        <span className='menu-span'><NavLink exact to="/addResource">Add Resource</NavLink></span>
                        <span className='menu-span'><NavLink exact to="/editColumn">Edit Column</NavLink></span>
                    </div>}
                </OutsideClickHandler>
            </Fragment>
        )
    }
}

export default SlideMenu;