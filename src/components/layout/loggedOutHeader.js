import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LoggedOutHeader extends React.Component {
    render() {
        return (
            <header className="header">
                <span className="header-brand">
                    <NavLink to='/'><b className="bold">plan</b>my.ml</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/plan'>Mealplans</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/home/login'>Recipes</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/home/login'>Goals</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/about'>About Us</NavLink>
                </span>
                <span className="header-login">
                    <NavLink className="btn-login" to='/home/login'>LOGIN</NavLink>
                </span>
            </header>
        );
    }
}