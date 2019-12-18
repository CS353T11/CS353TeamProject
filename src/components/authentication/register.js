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
            diet:'',
            error: '',
        }
    }

    handleChange = (e) => {
        //console.log(e.target.id+" => "+e.target.value);
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
        const { name, age, gender, height, weight, activityLevel,diet} = this.state;
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
                        diet:diet
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
        const { name, age, gender, height, weight, activityLevel,diet} = this.state;
        return (
            <div className="view register">
                    <h3 className="register-header">Register Member</h3>
                        <form onSubmit={this.handleSubmit} className="form">
                            <div className="register-form">
                                <div className="form1">
                                    <p for="email">Email: </p>
                                    <input required className="input" type="text" name="email" id="email" placeholder={"Enter Email"} onChange={this.handleChange} />


                                    <p className="label" for="password">Password:</p>
                                    <input required className="input" type="password" id="password" name="password" placeholder={"Enter Password"} style={{}} onChange={this.handleChange} />

                                    <p className="label">Confirm Password:</p>
                                    <input required className="input" type="password" id="confirmPassword" name="confirmPassword" placeholder={"Enter Password"} style={{}} onChange={this.handleChange} />

                                    <p className="label">Name:</p>
                                    <input required className="input" type="text" id="name" name="name" min="1" max="30" placeholder="Name" onChange={this.handleChange} value={name}></input>
                                </div>
                                <div className="form2">
                                    <p className="label">Age:</p>
                                    <input required className="input" id="age" name="age" type="number" min="0" max="150" placeholder="Age" onChange={this.handleChange} value={age}></input>

                                    <Select id="gender" name="gender" onChange={this.handleChange} value={gender ? gender : ""}><option disabled value="">Sex</option><option value="Male">Male</option><option value="Female">Female</option></Select>

                                    <div className="height-weight">
                                        <div className="height">
                                            <input required className="input" id="height"
                                                   name="height" type="number" min="0" max="300"
                                                   placeholder="Height" onChange={this.handleChange}
                                                   value={height}>
                                            </input>
                                            <p>cm</p>
                                        </div>
                                        <div className="weight">
                                            <input required className="input" id="weight" name="weight"
                                                   type="number" min="0" max="400"placeholder="Weight"
                                                   onChange={this.handleChange} value={weight}>
                                            </input>
                                            <p>Kg</p>
                                        </div>
                                    </div>

                                    <Select id="activityLevel" onChange={this.handleChange} value={activityLevel ? activityLevel : ""}>
                                        <option disabled value="">Activity Level</option>
                                        <option value="Low">Low</option><option value="Moderate">Moderate</option>
                                        <option value="High">High</option>
                                    </Select>
                                </div>
                            </div>
                            <div className="submit-box">
                                <Select id="diet"
                                        onChange={this.handleChange}
                                    //window.location.reload();
                                        options={{
                                            classes: '',
                                            dropdownOptions: {alignment: 'left', autoTrigger: true, closeOnClick: true, constrainWidth: true, container: null, coverTrigger: true, hover: false, inDuration: 150, onCloseEnd: null, onCloseStart: null, onOpenEnd: null, onOpenStart: null, outDuration: 250}
                                        }} value={diet ? diet : ""}>
                                    <option disabled value="">Diet Plan</option>
                                    <option value="Maintain weight" onChange={this.handleChange}>Maintain Weight</option>
                                    <option value="Lose weight" onChange={this.handleChange}>Lose Weight</option>
                                    <option value="Gain weight" onChange={this.handleChange}>Gain Weight</option>
                                    <option value="High Protein diet" onChange={this.handleChange}>High Protein</option>
                                    <option value="Ketogenic diet" onChange={this.handleChange}>Ketogenic</option>
                                </Select>
                                <button type="submit" className="btn-login" >REGISTER</button>
                                {this.state.error ? <p className="alert">{this.state.error.message}</p> : null}
                            </div>
                        </form>
            </div>
        );
    }
}