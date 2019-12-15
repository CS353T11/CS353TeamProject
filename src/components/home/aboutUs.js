import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';

export default class aboutUs extends React.Component {
    state = {
        user: null,
        error: null,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user })
            }
        })
    }

    render() {
        return (
            <div className="view about-us">
                This was a project created for our CS353 Team Project module.

            </div>
        );
    }
}