import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';

export default class HomeView extends React.Component {
    state = {
        user: null,
        error: null,
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
                <div className="home">
                    <div className="home-illustration">
                        <img alt="cute big img"></img>
                    </div>
                    <div className="home-titles">
                        <h2 className="title">Plan <b className="bold">meals.</b><br />
                            Track <b className="bold">nutrition.</b><br />
                            Reach your <b className="bold">goals.</b>
                        </h2>
                        <p className="subtitle">
                            Create your flexible mealplan and input your actual meals.<br />
                            Track your nutrition with our simplified graphics and adjust <br /> your plan to get your goals.
                    </p>
                        {this.state.user ? null : <NavLink className="btn-login" to='/register'>CREATE YOUR ACCOUNT</NavLink>}
                    </div>
                </div>
            </div>
        );
    }
}