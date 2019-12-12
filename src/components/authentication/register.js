import React from 'react';
import firebase from 'firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {Select} from "react-materialize";

export default class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            user: null,
            name: '',
            age: '',
            gender: null,
            height: '',
            weight: '',
            activityLevel: '',
            error: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password, confirmPassword } = this.state;
        if (password.length >= 6) {
            if (password === confirmPassword) {
                firebase.auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        this.saveUserDetails();
                    })
                    .catch(error => {
                        this.setState({ error })
                    })
            } else {
                this.setState((preState) => ({ ...preState, error: { message: 'Two password are different' } }))
            }
        } else {
            this.setState((preState) => ({ ...preState, error: { message: 'Password should be more than 6 characters' } }))
        }
        console.log(this.state.error)
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user })
            }
        })
    }

    saveUserDetails(){
        let userId;
        const { name, age, gender, height, weight, activityLevel} = this.state;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User logged in already or has just logged in.
                console.log(user.uid);
                userId = user.uid;
                firebase.firestore().collection('profiles').doc(userId)
                .set({
                        name:name,
                        age:age,
                        height:height,
                        gender:gender,
                        weight:weight,
                        activityLevel:activityLevel,
                    })
                    .then(() => {
                        const MySwal = withReactContent(Swal);
                        MySwal.fire({
                            icon: 'success',
                            title: 'Account create successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
                    this.props.history.push('/profile');
            }
        });

    }

    render() {
        const { name, age, gender, height, weight, activityLevel} = this.state;
        return (
            <div className="view register">
                    {/*<h3 className="register-header">Register Member</h3>*/}
                    <div className="register-form">
                        {<h3 className="register-header">Register Member</h3>}
                        <br></br><br></br>
                        <form onSubmit={this.handleSubmit} className="form">
                            <label className="label">Email: </label>
                            <input required className="input" type="text" name="email" id="email" placeholder={"Enter Email"} onChange={this.handleChange} />
                            <label className="label">Password:</label>
                            <input required className="input" type="password" id="password" name="password" placeholder={"Enter Password"} style={{}} onChange={this.handleChange} />
                            <label className="label">Confirm Password:</label>
                            <input required className="input" type="password" id="confirmPassword" name="confirmPassword" placeholder={"Enter Password"} style={{}} onChange={this.handleChange} />
                            <label className="label">Name:</label>
                            <input required className="input" type="text" id="name" name="name" min="1" max="30" placeholder="Name" onChange={this.handleChange} value={name}></input>
                            <label className="label">Enter Age:</label>
                            <input required className="input" id="age" name="age" type="number" min="0" max="150" placeholder="Age" onChange={this.handleChange} value={age}></input>
                            <label className="label">Gender:</label>
                            <Select id="gender" name="gender" onChange={this.handleChange} value={gender ? gender : ""}><option disabled value="">Gender</option><option value="Male">Male</option><option value="Female">Female</option></Select>
                            <label className="label">Height (cm):</label>
                            <input required className="input" id="height" name="height" type="number" min="0" max="300" placeholder="Height" onChange={this.handleChange} value={height}></input>
                            <label className="label">Weight (kg):</label>
                            <input required className="input" id="weight" name="weight" type="number" min="0" max="200"placeholder="Weight" onChange={this.handleChange} value={weight}></input>
                            <label className="label">Activity Level:</label>
                            <Select id="activityLevel" onChange={this.handleChange} value={activityLevel ? activityLevel : ""}><option disabled value="">Activity Level</option><option value="Low">Low</option><option value="Moderate">Moderate</option><option value="High">High</option></Select>
                            <br></br>
                            <button type="submit" className="btn-login" >REGISTER</button>
                            <br></br>
                            {this.state.error ? <p>{this.state.error.message}</p> : null}
                        </form>
                    </div>
            </div>
        );
    }
}