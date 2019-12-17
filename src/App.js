import React from 'react';
import './scss/styles.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/layout/footer';
import HomeView from './components/home/homeview';
import firebase from './components/firebase/firebase';
import LoggedInHeader from './components/layout/loggedInHeader';
import LoggedOutHeader from './components/layout/loggedOutHeader';
import MealPlannerPage from './components/mealPlan/MealPlannerPage';
import Profile from './components/userInfo/profile';
import EditProfile from './components/userInfo/editProfile';
import Register from './components/authentication/register';
import ChangePassword from './components/userInfo/changePassword'
import aboutUs from "./components/home/aboutUs";

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
            <BrowserRouter >
                {/* render different header for logged-in user and no-register user */}
                {this.state.user ? <LoggedInHeader /> : <LoggedOutHeader />}
                {/* render different body for various route */}
                <Switch>
                    <Route path="/" component={HomeView} exact />
                    <Route path='/home' component={HomeView} />
                    <Route path='/plan' component={MealPlannerPage} />

                    <Route path='/profile' component={Profile}/>
                    <Route path='/edit-profile' component={EditProfile}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/edit-pwd' component={ChangePassword}/>

                    <Route path='/about' component={aboutUs}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        )
    }
}

