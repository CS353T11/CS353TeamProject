import React from 'react';
import img from '../../images/recipe.svg'

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
                        <img className="img" alt="Icon by https://www.flaticon.es/autores/freepik" src={img}></img>
                    </div>

                    <div className="footer-item">
                        <p className="bold">Contact & Suport</p>
                        <p>FAQ</p>
                        <p>Email</p>
                        <p>Instagram</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <a href="https://www.google.com/">Terms of use</a>
                    <a href="https://www.google.com/">Privacy Policy</a>
                    <a href="https://www.google.com/">Cookie Policy</a>
                    <span className="copyright">© Copyright 2019 - 2020 . planmyml. All rights reserved.</span>
                </div>
            </footer>
        );
    }
}