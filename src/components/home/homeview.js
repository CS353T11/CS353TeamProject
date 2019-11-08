import React from 'react';
import {Switch, Route, NavLink} from 'react-router-dom';
import LoginPopUp from '../authentication/loginPopUp';

export default class HomeView extends React.Component {
    render() {
        return (
            <div className="view">
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
                        <NavLink className="btn-login" to='/home/register'>CREATE YOUR ACCOUNT</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}