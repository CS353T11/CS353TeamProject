import React from 'react';
import firebase from 'firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {NavLink} from "react-router-dom";

export default class Register extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        user: null,
        error: null,
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
                        const MySwal = withReactContent(Swal);
                        MySwal.fire({
                            icon: 'success',
                            title: 'Account create successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.props.history.push('/');
                    })
                    .catch(error => {
                        this.setState({ error })
                    });
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

    render() {
        return (
            <div className="view">
                <div className="register">
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
                            <br></br>
                            {/*<a className="forgot" onClick={()=> this.setState({forget: true})}>forgot your password?</a>*/}
                            <button NavLink to='../homeview' type="submit" className="btn-login" >REGISTER</button>
                            <br></br>
                            {this.state.error ? <p>{this.state.error.message}</p> : null}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}