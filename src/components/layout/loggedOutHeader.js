import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginPopUP from '../authentication/loginPopUp';
import About from '../home/aboutUs';

export default class LoggedOutHeader extends React.Component {
    render() {
        return (
            <header className="header">
                <span className="header-brand">
                    <NavLink to='/'><b className="bold">plan</b>my.ml</NavLink>
                </span>
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