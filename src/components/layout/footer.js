import React from 'react';

export default class Footer extends React.Component {
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