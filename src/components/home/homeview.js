import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';
import homepage_gif from '../../images/homepage-gif.gif';

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
            <div className="view home">
                <div className="first-section">
                    <div className="big-sub">
                        <div className="home-illustration">
                        <img src={homepage_gif} alt="Homepage Ilustration" className="gif"/>
                        </div>
                        <div className="home-titles">
                            <h2 className="title">Plan <b className="bold">meals.</b><br />
                                Track <b className="bold">nutrition.</b><br />
                                Reach your <b className="bold">goals.</b>
                            </h2>
                            <div className="subtitle">
                                <p>Create your flexible mealplan and input your meals using our intelligent searchbar.
                                 Track your nutrition with our automatic calculation and simplified representation.
                                 Readjust you plan on the way to reach your goals. </p>
                            </div>
                            {this.state.user ? null : <NavLink className="btn-login" to='/register'>CREATE YOUR ACCOUNT</NavLink>}
                        </div>
                    </div>
                    <div className="subtitle">
                        <p>Create your flexible mealplan and input your meals using our intelligent searchbar.
                        Track your nutrition with our automatic calculation and simplified representation.
                        Readjust you plan on the way to reach your goals. </p>
                    </div>
                </div>

                <div className="second-section">
                    <h3 className="second-title">A smart way to <br/>organize your meals</h3>
                    <div className="sub-section">
                        <div className="screencast">
                            <video width="100%" height="" controls>
                                <source src="movie.mp4" type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="subsub">
                            <span className="sub-title">This is our CS353</span>
                            <span className="sub-title">final project</span>
                            <p className="sub-descr"> Planmy.ml was developed by Maynooth University students for
                                the Team Project module during the span of 3 months using agile development methods.
                            </p>
                            <NavLink className="btn-login" to='/about'>Know more about it</NavLink>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}