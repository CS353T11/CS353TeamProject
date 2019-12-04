import React from 'react';
import firebase from '../firebase/firebase';
import Avatar from '../../images/avatar.svg';
import { NavLink } from 'react-router-dom';

export default class Profile extends React.Component {
    state = {
        user: null,
        name: '',
        age: '',
        gender: null,
        height: '',
        weight: '',
        activityLevel: '',
        error: '',
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user })
                let profileRef = firebase.firestore().collection('profiles').doc(user.uid).get().then(doc => {
                    this.setState((preState) => ({ ...preState.user, ...doc.data() })
                    )
                });
            } else {
                this.props.history.push('/');
            }
        })
    }

    render() {
        //console.log(this.state)
        const { name, age, gender, height, weight, activityLevel, } = this.state;
        return (
            <div className="profile">
                <div className="user-details">
                    <div className="profile-id">
                        <img src={Avatar} alt="avatar"></img><br></br>
                        <h1 className="title"></h1><h1 className="bold">{name}</h1>
                        <div><b className="bold">email</b></div>
                        <div><b className="bold">password</b></div>
                        <NavLink to='/edit_profile'>edit details</NavLink>
                    </div>
                </div>
                <div className="extra-details">
                        <div className="hdr">User Details</div>
                        <div className="table">
                            <div className="row">
                                <div className="cell">Name:</div>
                                <div className="cell">{name}</div>
                            </div>
                            <div className="row">
                                <div className="cell">Age:</div>
                                <div className="cell">{age}</div>
                            </div>
                            <div className="row">
                                <div className="cell">Gender:</div>
                                <div className="cell">{gender}</div>
                            </div>
                            <div className="row">
                                <div className="cell">Height (cm):</div>
                                <div className="cell">{height}</div>
                            </div>
                            <div className="row">
                                <div className="cell">Weight (kg):</div>
                                <div className="cell">{weight}</div>
                            </div>
                            <div className="row">
                                <div className="cell">Activity level:</div>
                                <div className="cell">{activityLevel}</div>
                            </div>
                        </div>
                </div>
                <div className="achievements">
                    Achievements
                    </div>
            </div>
        );
    }


}