import React from 'react';
import firebase from '../firebase/firebase';
import { Modal } from 'react-materialize';

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
                    error: null,
                    forget: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error });
                console.log(error);
            })
    }

    //handle the forget password process
    handleForget = (e) => {
        e.preventDefault();
        const { email } = this.state;
        firebase.auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                this.setState({
                    email: '',
                    password: '',
                    error: null,
                    forget: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error });
            })
    }

    render() {
        const LoginTrigger = <p onClick={()=> this.setState({forget: false})} className="btn-login">LOGIN</p>;
        //console.log(this.state);
        return (
            <Modal trigger={LoginTrigger} actions={false} className="login">
                {this.state.forget ?
                    (<div>
                        <h3 className="login-header">Forgot your password?</h3>
                        <form onSubmit={this.handleForget} className="form">
                            <p className="text">Don't worry. We will send you a link so that you can restore it. </p>
                            <br/>
                            <label className="label">Email:</label>
                            <input required className="input" type="text" name="email" id="email" placeholder={"Enter Email"} onChange={this.handleChange} />
                            <p className="forgot" onClick={()=> this.setState({forget: false})}>I remembered!</p>
                            <button type="submit" className="btn-login" >RESET PASSWORD</button>
                        </form>
                    </div>)
                    :
                    (<div>
                        <h3 className="login-header">Login Member</h3>
                        <form onSubmit={this.handleSubmit} className="form">
                            <label className="label">Email: </label>
                            <input required className="input" type="text" name="email" id="email" placeholder={"Enter Email"} onChange={this.handleChange} />
                            <br></br>
                            <label className="label">Password:</label>
                            <input required className="input" type="password" id="password" name="password" placeholder={"Enter Password"} style={{}} onChange={this.handleChange} />
                            <br></br>
                            <div>
                                {this.state.error ? <p style={{color:"red"}}>{this.state.error.message}</p> : null}
                            </div>
                            <p className="forgot" onClick={()=> this.setState({forget: true})}>forgot your password?</p>
                            <button type="submit" className="btn-login" >LOGIN</button>
                            
                        </form>
                    </div>)
                    }
            </Modal>
        )
    }
}
