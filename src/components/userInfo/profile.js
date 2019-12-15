import React from 'react';
import firebase from '../firebase/firebase';
import SideBar from './sideBar';
import Diet from '../mealPlan/goals';

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
                <div className="profile-details">
                    <h3 className="title">User Details</h3>

                    <div className="table">
                        <div className="row">
                            <div className="cell bold">Name:</div>
                            <div className="cell">{name}</div>
                        </div>
                        <div className="row">
                            <div className="cell bold">Age:</div>
                            <div className="cell">{age}</div>
                        </div>
                        <div className="row">
                            <div className="cell bold">Gender:</div>
                            <div className="cell">{gender}</div>
                        </div>
                        <div className="row">
                            <div className="cell bold">Height:</div>
                            <div className="cell">{height} cm</div>
                        </div>
                        <div className="row">
                            <div className="cell bold">Weight:</div>
                            <div className="cell ">{weight} kg</div>
                        </div>
                        <div className="row">
                            <div className="cell bold">Activity level:</div>
                            <div className="cell">{activityLevel}</div>
                        </div>
                    </div>
                </div>
                <Diet/>
            </div>
        );
    }


}