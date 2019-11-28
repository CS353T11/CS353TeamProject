import React from 'react';
import firebase from '../firebase/firebase';
import Avatar from '../../images/avatar.svg';
import {RadioGroup} from 'react-materialize';


export default class Profile extends React.Component {
    state = {
        user: null,
        name: '',
        age: '',
        //gerder: null,
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
                let profileRef = firebase.database().ref(`profiles/${user.uid}`)
                profileRef.once('value', (snapshot) => {
                    console.log(snapshot.val())
                    this.setState((preState) => ({ ...preState.user, ...snapshot.val() })
                    )
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
        const { name, age, height, weight, activityLevel } = this.state;
        firebase.database().ref('profiles/' + userId).set({
            name,
            age,
            height,
            weight,
            activityLevel,
            userId: userId,
            timestamp: timestamp,
        }).then(this.props.history.push('/profile')).catch(error => {
            this.setState({ error })
        })
    }

    render() {
        //console.log(this.state)
        const { name, age, height, weight, activityLevel, } = this.state;
        return (
            <div className="profile">
                    <div className="user-details">
                        <div className="profile-id">
                            <img src={Avatar} alt="avatar"></img><br></br>
                            <h2 className="title"><p className="bold">{name}</p></h2>
                            <div><b className="bold">email</b></div>
                            <div><b className="bold">password</b></div>
                            <button className="submit">edit details</button>
                        </div>
                    </div>
                    <div className="extra-details">
                        <form onSubmit={this.handleSubmit} className="form">
                            <h1>User Details</h1>
                            <div className="table">
                                <div className="row">
                                    <div className="cell">Name</div>
                                    <div className="cell"><input id="name" required className="input" type="text" placeholder="Name" onChange={this.handleChange} value={name}></input></div>
                                </div>
                                <div className="row">
                                    <div className="cell">Age</div>
                                    <div className="cell"><input id="age" required className="input" type="text" placeholder="Age" onChange={this.handleChange} value={age}></input></div>
                                </div>
                                <div className="row">
                                    <div className="cell">Gender</div>
                                    <RadioGroup
                                        name="gender" withGap label="Gender" options={[
                                        {label: 'Male',value: 'op1'},
                                        {label: 'Female',value: 'op2'}]}>
                                    </RadioGroup>
                                </div>
                                <div className="row">
                                    <div className="cell">Height</div>
                                    <div className="cell"><input id="height" required className="input" type="text" placeholder="Height" onChange={this.handleChange} value={height}></input></div>
                                </div>
                                <div className="row">
                                    <div className="cell">Weight</div>
                                    <div className="cell"><input id="weight" required className="input" type="text" placeholder="Weight" onChange={this.handleChange} value={weight}></input></div>
                                </div>
                                <div className="row">
                                    <div className="cell">Activity level</div>
                                    <div className="cell"><input id="activityLevel" required className="input" type="text" placeholder="Activity Level" onChange={this.handleChange} value={activityLevel}></input></div>
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