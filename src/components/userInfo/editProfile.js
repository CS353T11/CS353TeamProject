import React from 'react';
import firebase from '../firebase/firebase';
import SideBar from './sideBar';
import Achievements from './achievements'
import { RadioGroup, Select } from 'react-materialize';

export default class EditProfile extends React.Component {
    state = {
        user: null,
        email: '',
        name: '',
        age: '',
        gender: null,
        height: '',
        weight: '',
        activityLevel: '',
        error: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user })
                let profileRef = firebase.firestore().collection('profiles').doc(user.uid).get().then(doc => {
                    this.setState({ email: user.email, user, ...doc.data() })
                });
            } else {
                this.props.history.push('/');
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const userId = this.state.user.uid;
        const timestamp = new Date().toLocaleString();
        const { name, age, gender, height, weight, activityLevel } = this.state;
        if (Number(age) > 150 || Number(age) < 0) {
            this.setState({ error: { message: 'Invalid age' } });
        } else {
            firebase.firestore().collection('profiles').doc(userId)
                .set({
                    name,
                    age,
                    height,
                    gender,
                    weight,
                    activityLevel,
                    timestamp: timestamp,
                }).then(this.props.history.push('/profile')).catch(error => {
                    this.setState({ error })
                })
        }
    }

    render() {
        //console.log(this.state)
        const fixName = this.state.name;
        const { name, age, gender, height, weight, activityLevel, email } = this.state;
        return (
            <div className="profile">
                <SideBar name={name} email={email} path="/edit-profile" />
                <div className="profile-details">
                    <h3 className="title">User Details</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="table">
                            <div className="row">
                                <div className="cell bold">Name:</div>
                                <div className="cell">
                                    <input id="name" required className="input" type="text" placeholder="Name" onChange={this.handleChange} value={fixName}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="cell bold">Age:</div>
                                <div className="cell">
                                    <input id="age" required className="input" type="number" min="0" max="150" placeholder="Age" onChange={this.handleChange} value={age}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="cell bold">Gender:</div>
                                <div className="cell">
                                    <Select id="gender" onChange={this.handleChange}
                                        // onChange={function noRefCheck() { }}
                                        // options={{
                                        //     classes: '',
                                        //     dropdownOptions: { alignment: 'left', autoTrigger: true, closeOnClick: true, constrainWidth: true, container: null, coverTrigger: true, hover: false, inDuration: 150, onCloseEnd: null, onCloseStart: null, onOpenEnd: null, onOpenStart: null, outDuration: 250 }
                                        // }}
                                        value={gender ? gender : ""}>
                                        <option
                                            disabled
                                            value=""
                                        >
                                            Gender
                                        </option>
                                        <option value="Male">
                                            Male
                                        </option>
                                        <option value="Female">
                                            Female
                                        </option>
                                    </Select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="cell bold">Height (cm):</div>
                                <div className="cell">
                                    <input id="height" required className="input" type="number" min="0" max="300" placeholder="Height" onChange={this.handleChange} value={height}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="cell bold">Weight (kg):</div>
                                <div className="cell">
                                    <input id="weight" required className="input" type="number" min="0" max="200"placeholder="Weight" onChange={this.handleChange} value={weight}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="cell bold">Activity level:</div>
                                <div className="cell">
                                    <Select id="activityLevel" onChange={this.handleChange}
                                        // onChange={function noRefCheck() { }}
                                        // options={{
                                        //     classes: '',
                                        //     dropdownOptions: { alignment: 'left', autoTrigger: true, closeOnClick: true, constrainWidth: true, container: null, coverTrigger: true, hover: false, inDuration: 150, onCloseEnd: null, onCloseStart: null, onOpenEnd: null, onOpenStart: null, outDuration: 250 }
                                        // }}
                                        value={activityLevel ? activityLevel : ""}>
                                        <option
                                            disabled
                                            value=""
                                        >
                                            Activity Level
                                        </option>
                                        <option value="Low">
                                            Low
                                        </option>
                                        <option value="Moderate">
                                            Moderate
                                        </option>
                                        <option value="High">
                                            High
                                        </option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn-login submit">Submit</button>
                            <div>
                                {this.state.error ? <p>{this.state.error.message}</p> : null}
                            </div>
                        </div>
                    </form>
                </div>
                <Achievements />
            </div>
        );
    }


}