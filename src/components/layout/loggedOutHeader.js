import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginPopUP from '../authentication/loginPopUp';
import logo from "../../images/logo.svg";

export default class LoggedOutHeader extends React.Component {
    render() {
        return (
            <header className="header">
                <NavLink to='/' className="header-brand">
                    <img src={logo} alt="logo"></img> <b className="bold">plan</b>my.ml
                </NavLink>

                <span className="header-link">
                    <NavLink to='/register'>Meal Plans</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/register'>Profile</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/About'>About Us</NavLink>
                </span>
                <span className="header-login">
                    <LoginPopUP history={this.props.history}/>
                </span>
            </header>
        );
    }
}