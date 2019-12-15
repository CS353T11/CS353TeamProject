import React from 'react';
import img from '../../images/recipe.svg';
import {NavLink} from 'react-router-dom';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-item">
                        <NavLink to="/" className="bold">planmy.ml</NavLink>
                        <NavLink to="/plan">Mealplan</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                        <NavLink to="/about">About Us</NavLink>
                    </div>

                    <div className="footer-item">
                        <img className="img" alt="Icon by https://www.flaticon.es/autores/freepik" src={img}></img>
                    </div>

                    <div className="footer-item">
                        <p className="bold">Contact & Suport</p>
                        <NavLink to="/about">FAQ</NavLink>
                        <a  href="mailto:info@planmy.ml?Subject=Hello" >Email</a>
                        <a href="https://www.instagram.com/aymchill/" target="_blank">Instagram</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <a href="https://lmgtfy.com/?q=terms+of+use" target="_blank">Terms of use</a>
                    <a href="https://lmgtfy.com/?q=privacy+policy" target="_blank">Privacy Policy</a>
                    <a href="https://lmgtfy.com/?q=cookie+policy" target="_blank">Cookie Policy</a>
                    <span className="copyright">© Copyright 2019 - 2020 . planmyml. All rights reserved.</span>
                </div>
            </footer>
        );
    }
}