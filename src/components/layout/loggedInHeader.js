import React from 'react';
import firebase from '../firebase/firebase'
import { NavLink } from 'react-router-dom';

export default class LoggedInHeader extends React.Component {
    state = {
        error: null
    }
    logOutUser = () => {
        firebase.auth().signOut()
            .then(window.location = "/")
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        return (
            <header className="header">
                <span className="header-brand">
                    <NavLink to='/'><b className="bold">plan</b>my.ml</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/'>Home</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/plan'>Meal Plans</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/profile'>Profile</NavLink>
                </span>
                <span className="header-link">
                    <NavLink to='/about'>About Us</NavLink>
                </span>
                <span className="header-login">
                    <a href="/#" className="btn-login"  onClick={this.logOutUser}>LOG OUT</a>
                </span>
            </header>
        );
    }
}