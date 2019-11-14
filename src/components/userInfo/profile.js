import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import LoginPopUp from '../authentication/loginPopUp';
import firebase from 'firebase';

export default class HomeView extends React.Component {
    state = {
        user: null,
        error: null,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({user})
            }
        })
    }

    render() {
        return (
            <div className="view">
                <div className="home">
                    <h2 className="title"><a className="bold">User Profile</a></h2>
                    <br/>
                    <table >
                        <tr>
                            <th>Firstname:</th>
                            <th>*name here*</th>
                        </tr>
                        <tr>
                            <td>Surname:</td>
                            <th>*name here*</th>
                        </tr>
                        <tr>
                            <td>Date of Birth:</td>
                            <td>*here*</td>
                        </tr>
                        <tr>
                            <td>Weight:</td>
                            <td>*here*</td>
                        </tr>
                        <tr>
                            <td>Activity Level:</td>
                            <td>*here*</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }


}