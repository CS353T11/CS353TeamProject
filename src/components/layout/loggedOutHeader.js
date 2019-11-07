import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LoggedOutHeader extends React.Component {
    render() {
        return (
            <header className="header">
                <span className="header-brand">
                    Planmy.ml
                </span>
                <span className="header-link">
                    About Us
                </span>
                <span className="header-login">
                    <NavLink to='/home/login'>LOGIN</NavLink>
                </span>
            </header>
        );
    }
}