import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import LoginPopUp from '../authentication/loginPopUp';
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
                {/* loginPopUp can only show in home page, because of the structure */}
                <Switch><Route path='/home/login' component={LoginPopUp} /></Switch>
                <div className="home">
                    <div className="home-illustration">
                        <img alt="cute big img"></img>
                    </div>
                    <div className="home-titles">
                        <h2 className="title">Plan your meals easily<br />
                            Track your nutrition.<br />
                            Get your <b className="bold">goals.</b>
                        </h2>
                        <p className="subtitle">
                            Create your flexible mealplan and input your actual meals.<br />
                            Track your nutrition with our simplified graphics and adjust <br /> your plan to get your goals.
                    </p>
                        {this.state.user ? null : <NavLink className="btn-login" to='/home/register'>CREATE YOUR ACCOUNT</NavLink>}
                    </div>
                </div>
            </div>
        );
    }
}