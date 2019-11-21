import React from 'react';
//import logo from './logo.svg';
import './scss/styles.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/layout/footer';
import HomeView from './components/home/homeview';
import SignUp from './components/authentication/signUp';
import firebase from './components/firebase/firebase';
import LoggedInHeader from './components/layout/loggedInHeader';
import LoggedOutHeader from './components/layout/loggedOutHeader';
import Planner from './components/mealPlan/planner';
import NutriScore from './components/mealPlan/nutriScore';
import Goals from './components/mealPlan/goals';
import  Profile from './components/userInfo/profile';

//all the components have moved to components directory, you can find the path there


export default class App extends React.Component {
    state = {
        user: null,
        error: null,
        //authenticated:null
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
            <BrowserRouter>
                {/* render different header for logged-in user and no-register user */}
                {this.state.user ? <LoggedInHeader /> : <LoggedOutHeader />}
                {/* render different body for various route */}
                <Switch>
                    <Route path="/" component={HomeView} exact />
                    <Route path='/home' component={HomeView} />
                    <Route path='/plan' component={Planner} />
                    <Route path='/recipes' component={NutriScore} />
                    <Route path='/goals' component={Goals} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/profile' component={Profile}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        )
    }
}
/*
class LoginPopUp extends React.Component {
    render() {
        return (
        <div className="login">
            <form>
                <label>Username </label>
                <input type="text" name="username" />
                <br/>
                <label>Password</label>
                <input type="text" name="password" />
            </form>
        </div>
        )
    }
}

class GoalsView extends React.Component {
    render() {
        return (
            <div id="results">
                will show the results of the users nutrition.
            </div>
        );
    }
}

class HomeView extends React.Component {
    render() {
        return (
            <div className="home">
                <div className="home-illustration">
                    Cute big illustration
                </div>
                <div className="home-titles">
                    <h2>Plan your meals easily<br/>
                        Track your nutrition.<br/>
                        Get your goals.
                    </h2>
                    <p>
                        Create your flexible mealplan and input your actual meals.
                        Track your nutrition with our simplified graphics and adjust your plan to get your goals.
                    </p>
                    <button className="btn-login">CREATE YOUR FREE ACCOUNT</button>
                </div>
            </div>
        );
    }
}

class PlannerView extends React.Component {
    render() {
        return (
            <div id="main">
                <h1>Plan My Meal</h1>
                View Profile
                <SearchBar/>
                <WeekPlan/>
                <NutriScore/>
            </div>
        );
    }
}

class WeekPlan extends React.Component{
    render() {
        return (
            <table id="plan">
                <tr>
                    <th>Meal</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>

                </tr>
                <tr>
                    <th>Meal 1</th>
                </tr>
                <tr>
                    <th>Meal 2</th>
                </tr>
                <tr>
                    <th>Meal 3</th>
                </tr>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    render() {
        return (
            <div className="search">
                Search Meal:
            </div>
        );
    }
}

class NutriScore extends React.Component {
    render() {
        return (
            <div id="results">
                will show the results of the users nutrition.
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <span className="header-brand">
                    planmy.ml
                </span>
                <span className="header-link">
                    Mealplans
                </span>
                <span className="header-link">
                    Recipes
                </span>
                <span className="header-link">
                    Goals
                </span>
                <span className="header-link">
                    About Us
                </span>
                <span className="header-login">
                    LOGIN
                </span>
            </header>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-item">
                    <p>planmy.ml</p>
                    <p>Mealplans</p>
                    <p>Recipes</p>
                    <p>Goals</p>
                    <p>About Us</p>
                </div>

                <div className="footer-item">
                    cute ilustration
                </div>

                <div className="footer-item">
                    <p>Contact & Suport</p>
                    <p>FAQ</p>
                    <p>Email</p>
                    <p>Instagram</p>
                </div>

            </footer>
        );
    }
}

function View() {
    return (
        <div className="view">
            <LoginPopUp />
            <HomeView />
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Header />
            <HomeView />
            <Footer />
        </div>
    );
}

export default App;
*/
