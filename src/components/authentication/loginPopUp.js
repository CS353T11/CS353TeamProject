import React from 'react';
import firebase from '../firebase/firebase';
import { Modal, Button } from 'react-materialize';

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
        const LoginTrigger = <Button className="btn-login">Log In</Button>;
        return (
            <Modal header="LogIn" trigger={LoginTrigger}>
                <div className="login">
                    <form onSubmit={this.handleSubmit}>
                        <label>E-mail: </label>
                        <input type="text" name="email" id="email" placeholder={"Enter Email"} onChange={this.handleChange} />
                        <br></br>
                        <label>Password:</label>
                        <input type="password" id="password" name="password" placeholder={"Enter Password"} onChange={this.handleChange} />
                        <br></br>
                        <button type="submit" className="btn-login" >Log In</button>
                    </form>
                </div>
            </Modal>
        )
    }
}
