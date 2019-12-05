import React from 'react';
import firebase from '../firebase/firebase';
import SideBar from './sideBar'
import { RadioGroup, Select } from 'react-materialize';

export default class EditProfile extends React.Component {
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
                    this.setState({ email:user.email, user, ...doc.data() })
                }).then(this.props.history.push('/edit_profile'));
            } else {
                this.props.history.push('/');
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const userId = this.state.user.uid;
        const timestamp = new Date().toLocaleString();
        const { name, age, gender, height, weight, activityLevel} = this.state;
        //console.log(this.state)
        firebase.firestore().collection('profiles').doc(userId)
            .set({
                name,
                age,
                height,
                gender,
                weight,
                activityLevel,
                timestamp: timestamp,
            }).catch(error => {
                this.setState({ error })
            })
    }

    render() {
        //console.log(this.state)
        const { name, age, gender, height, weight, activityLevel, email} = this.state;
        return (
            <div className="profile">
                <SideBar name={name} email={email}/>
                <div className="extra-details">
                    <form onSubmit={this.handleSubmit} className="form">
                        <div className="hdr">User Details</div>
                        <div className="table">
                            <div className="row">
                                <div className="cell">Name:</div>
                                <div className="cell"><input id="name" required className="input" type="text" placeholder="Name" onChange={this.handleChange} value={name}></input></div>
                            </div>
                            <div className="row">
                                <div className="cell">Age:</div>
                                <div className="cell"><input id="age" required className="input" type="text" placeholder="Age" onChange={this.handleChange} value={age}></input></div>
                            </div>
                            <div className="row">
                                <div className="cell">Gender:</div>
                                <Select id="gender" onChange={this.handleChange}
                                    // onChange={function noRefCheck() { }}
                                    // options={{
                                    //     classes: '',
                                    //     dropdownOptions: { alignment: 'left', autoTrigger: true, closeOnClick: true, constrainWidth: true, container: null, coverTrigger: true, hover: false, inDuration: 150, onCloseEnd: null, onCloseStart: null, onOpenEnd: null, onOpenStart: null, outDuration: 250 }
                                    // }} 
                                    value={gender?gender:""}>
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
                            <div className="row">
                                <div className="cell">Height (cm):</div>
                                <div className="cell"><input id="height" required className="input" type="text" placeholder="Height" onChange={this.handleChange} value={height}></input></div>
                            </div>
                            <div className="row">
                                <div className="cell">Weight (kg):</div>
                                <div className="cell"><input id="weight" required className="input" type="text" placeholder="Weight" onChange={this.handleChange} value={weight}></input></div>
                            </div>
                            <div className="row">
                                <div className="cell">Activity level:</div>
                                <Select id="activityLevel" onChange={this.handleChange}
                                    // onChange={function noRefCheck() { }}
                                    // options={{
                                    //     classes: '',
                                    //     dropdownOptions: { alignment: 'left', autoTrigger: true, closeOnClick: true, constrainWidth: true, container: null, coverTrigger: true, hover: false, inDuration: 150, onCloseEnd: null, onCloseStart: null, onOpenEnd: null, onOpenStart: null, outDuration: 250 }
                                    // }} 
                                    value={activityLevel?activityLevel:""}>
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
                        <div>
                            <button type="submit" className="submit">Submit</button>
                            <div>
                                {this.state.error ? <p>{this.state.error.message}</p> : null}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="achievements">
                    Achievements
                    </div>
            </div>
        );
    }


}