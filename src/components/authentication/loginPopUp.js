import React from 'react';
import firebase from '../firebase/firebase';
import { Modal } from 'react-materialize';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LoginPopUp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: '',
            password: '',
            error: null
        }
    }

    //change the state when the content change in the form
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //handle the submit
    handleSubmit = (e) => {
        e.preventDefault();
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
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    icon: 'success',
                    title: 'Logged In',
                    showConfirmButton: false,
                    timer: 1500
                });
                //TODO: for a smoother transition for closing, change props.history with a call to close modal
                console.log(this.props.history)
                this.props.history.push('/plan');
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
                const MySwal = withReactContent(Swal);
                MySwal.fire({
                    icon: 'success',
                    title: 'Reset password email sent',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error });
            })
    }

    render() {
        const LoginTrigger = <p onClick={() => this.setState({ forget: false })} className="btn-login">LOGIN</p>;
        //console.log(this.state);
        return (
            <Modal trigger={LoginTrigger} actions={false} className="login">
                {this.state.forget ?
                    (<div>
                        <h3 className="login-header">Forgot your password?</h3>
                        <form onSubmit={this.handleForget} className="form">
                            <p className="text">Don't worry. We will send you a link so that you can restore it. </p>
                            <br />
                            <label className="label">Email:</label>
                            <input required className="input" type="text" name="email" id="email" placeholder={"Enter Email"} onChange={this.handleChange} />
                            <p className="forgot" onClick={() => this.setState({ forget: false })}>I remembered!</p>
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
                                {this.state.error ? <p style={{ color: "red" }}>{this.state.error.message}</p> : null}
                            </div>
                            <p className="forgot" onClick={() => this.setState({ forget: true })}>forgot your password?</p>
                            {/*{this.state.user ? null : <NavLink className="forgot" to='/register'>create an account</NavLink>}*/}
                            {this.state.user ? null : <NavLink className="forgot" to='/register'>create an account</NavLink>}
                            <button type="submit" className="btn-login" >LOGIN</button>

                        </form>
                    </div>)
                }
            </Modal>
        )
    }
}

export default withRouter(LoginPopUp)
