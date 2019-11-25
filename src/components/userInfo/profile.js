import React from 'react';
import firebase from 'firebase';
import Avatar from '../../images/avatar.svg';

export default class HomeView extends React.Component {
    state = {
        user: null,
        error: null,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({user})
            }
        })
    }

    render() {
        return (
                <div className="profile">
                    <div className="user-details">
                        <div className="profile-id">
                            <img src={Avatar} alt="avatar"></img><br></br>
                            <h2 className="title"><p className="bold">Your Name</p></h2>
                            <div><b className="bold">email</b></div>
                            <div><b className="bold">password</b></div>
                            <button>edit details</button>
                        </div>
                    </div>
                    <div className="extra-details">
                        <h1>User Details</h1>
                        <div className="table">
                            <div className="row">
                                <div className="cell">Age</div>
                                <div className="cell">here</div>
                            </div>
                            <div className="row">
                                <div className="cell">Gender</div>
                                <div className="cell">here</div>
                            </div>
                            <div className="row">
                                <div className="cell">Height</div>
                                <div className="cell">here</div>
                            </div>
                            <div className="row">
                                <div className="cell">Weight</div>
                                <div className="cell">here</div>
                            </div>
                            <div className="row">
                                <div className="cell">Activity level</div>
                                <div className="cell">here</div>
                            </div>
                        </div>
                    </div>
                    <div className="achievements">
                        Achievements
                    </div>
                </div>
        );
    }


}