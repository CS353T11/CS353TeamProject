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
                <div className="profile">
                    <span className="user-details">
                        <div className="profile-id">
                            <img alt="avatar"></img><br></br>
                            <h2 className="title"><a className="bold">Your Name</a></h2>
                            <button>edit details</button>
                        </div>
                    </span>
                    <div className="extra-details">
                        <table className="xtra-dets">
                            <tr>
                                <th><b className="bold">Age</b></th>
                                <td>here</td>
                            </tr>
                            <tr>
                                <th><b className="bold">Gender</b></th>
                                <td>here</td>
                            </tr>
                            <tr>
                                <th><b className="bold">Height</b></th>
                            <td>here</td>
                        </tr>
                            <tr>
                                <th><b className="bold">Weight</b></th>
                                <td>here</td>
                            </tr>
                        </table>
                    </div>

                </div>
            </div>
        );
    }


}