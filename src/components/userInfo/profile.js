import React from 'react';
import firebase from '../firebase/firebase';
import SideBar from './sideBar';

export default class Profile extends React.Component {
    state = {
        user: null,
        email:'',
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
                //this.setState({ user })
                firebase.firestore().collection('profiles').doc(user.uid).get().then(doc => {
                    this.setState({ email:user.email, user, ...doc.data() })
                });
            } else {
                this.props.history.push('/');
            }
        })
    }

    render() {
        const { name, age, gender, height, weight, activityLevel, email } = this.state;
        return (
            <div className="profile">
                <SideBar name={name} email={email}/>
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