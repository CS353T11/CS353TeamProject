import React from 'react';
import firebase from '../firebase/firebase';

export default class LoginPopUp extends React.Component {
    state = {
        email: '',
        password: '',
        error: null
    }

    //change the state when the content change in the form
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //handle the submit
    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = this.state;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    email: '',
                    password: '',
                    error: null
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error });
            })
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <label>E-mail </label>
                    <input type="text" name="email" id="email" onChange={this.handleChange} />
                    <br />
                    <label>Password</label>
                    <input type="password" id="password" name="password" onChange={this.handleChange} />
                    <button type="submit">Log in</button>
                    
                </form>
            </div>
        )
    }
}
