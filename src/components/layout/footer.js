import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-item">
                        <p className="bold">planmy.ml</p>
                        <p>Mealplans</p>
                        <p>Recipes</p>
                        <p>Goals</p>
                        <p>About Us</p>
                    </div>

                    <div className="footer-item">
                        <img alt="cute little ilustration"></img>
                    </div>

                    <div className="footer-item">
                        <p className="bold">Contact & Suport</p>
                        <p>FAQ</p>
                        <p>Email</p>
                        <p>Instagram</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <a href="">Terms of use</a>
                    <a href="">Privacy Policy</a>
                    <a href="">Cookie Policy</a>
                    <span className="copyright">© Copyright 2019 - 2020 . planmyml. All rights reserved.</span>
                </div>
            </footer>
        );
    }
}