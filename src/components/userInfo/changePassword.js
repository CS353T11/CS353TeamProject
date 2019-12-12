//rebase

import React from 'react';
import firebase from '../firebase/firebase';
import SideBar from './sideBar'
import Achievements from './achievements'
export default class ChangePassword extends React.Component {
    state = {
        user: null,
        name: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        newEmail: '',
        confirmNewPassword: '',
        error: null,
        success: null,
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
                });
            } else {
                this.props.history.push('/');
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({ success: null, error: null })
        var virError = null
        const { oldPassword, newPassword, confirmNewPassword, email, newEmail } = this.state;
        if (newEmail !== '') {
            firebase.auth().currentUser.updateEmail(newEmail).then(this.setState({ success: 'Updating email successfully' })).catch(error => {
                this.setState({ error: error, success: null })
            })
        }
        if (newPassword.length > 0) {
            if (newPassword === confirmNewPassword) {
                //this.setState({ error: null })
                // console.log("try login")
                // let credential = firebase.auth().currentUser
                // //reauthenticateWithCredential not workes well
                // .reauthenticateAndRetrieveDataWithCredential(
                //     firebase.auth.EmailAuthProvider.credential(email, oldPassword)).then(x=>{console.log(x)})
                //     .catch(error => {
                //         virError = error
                //     });
                // console.log(virError)
                // console.log(credential)
                // console.log("login finished")
                // if (virError === null) {
                firebase.auth().currentUser.updatePassword(newPassword).catch(error => {
                    this.setState({ error, success: null })
                })
                if (this.state.error === null) {
                    this.setState({ success: 'Updating password successfully' })
                } else {
                    this.setState({ success: null })
                }
                // console.log(virError)
                // if (virError === null) {

                // } else {
                //     this.setState({ error: virError })
                // }
                // } else {
                //     this.setState({ error: virError })
                // }
            } else {
                this.setState({ error: { message: 'New password is different from confirm password' } })
            }
        }
    }

    render() {
        //console.log(this.state)
        const { oldPassword, newPassword, confirmNewPassword, name, email, newEmail } = this.state;
        return (
            <div className="profile">
                <SideBar name={name} email={email} path="/edit-pwd" />
                <div className="profile-details">
                    <form onSubmit={this.handleSubmit} className="form">
                        <h3 className="title">Change password</h3>
                        <div className="table">
                            {/* <div className="row">
                                <div className="cell">Old password:</div>
                                <div className="cell"><input id="oldPassword" required className="input" type="password" placeholder="Old password" onChange={this.handleChange} value={oldPassword}></input></div>
                            </div> */}
                            <div className="row">
                                <div className="cell bold">New E-mail:</div>
                                <div className="cell"><input id="newEmail" className="input" type="email" placeholder="Keep it blank when only change password" onChange={this.handleChange} value={newEmail}></input></div>
                            </div>
                            <div className="row">
                                <div className="cell bold">Create new password:</div>
                                <div className="cell"><input id="newPassword" className="input" type="password" placeholder="Create new password" onChange={this.handleChange} value={newPassword}></input></div>
                            </div>
                            <div className="row">
                                <div className="cell bold">Confirm new password:</div>
                                <div className="cell"><input id="confirmNewPassword" className="confirmNewPassword" type="password" placeholder="Confirm new password" onChange={this.handleChange} value={confirmNewPassword}></input></div>
                            </div>
                            <div>
                                <button type="submit" className="btn-login submit">Submit</button>
                                <div>
                                    {this.state.success ? <p style={{ color: "green" }}>{this.state.success}</p> : null}
                                    {this.state.error ? <p style={{ color: "red" }}>{this.state.error.message}</p> : null}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <Achievements/>
            </div>
        );
    }


}