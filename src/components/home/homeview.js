import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPopUp from '../authentication/loginPopUp';

export default class HomeView extends React.Component {
    render() {
        return (
            <div className="view">
                <Switch><Route path='/home/login' component={LoginPopUp} /></Switch>
                <div className="home">
                    <div className="home-illustration">
                        Cute big illustration
                </div>
                    <div className="home-titles">
                        <h2>Plan your meals easily<br />
                            Track your nutrition.<br />
                            Get your goals.
                    </h2>
                        <p>
                            Create your flexible mealplan and input your actual meals.
                            Track your nutrition with our simplified graphics and adjust your plan to get your goals.
                    </p>
                        <button className="btn-login">CREATE YOUR FREE ACCOUNT</button>
                    </div>
                </div>
            </div>
        );
    }
}