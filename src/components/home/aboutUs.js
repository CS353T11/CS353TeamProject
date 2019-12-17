import React from 'react';
//import { NavLink } from 'react-router-dom';
import firebase from 'firebase';

export default class aboutUs extends React.Component {
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
            <div className="view about-us">
                <h3 className="title">About this project</h3>
                <p> Planmy.ml is a project created for module CS353(Team Project) in Maynooth University. The module
                    consisted in creating a web app in groups and organizing the process using agile development
                    methods such as SCRUM</p>
                <p> The whole project was developed over the span of 3 months by 6 students (Group 11): Aaron, Ayman
                , Jake, Enming, Luke and Giorgio. </p>

                <h4 className="subtitle">Design</h4>

                <p> The idea itself and the first sketches were done by Ayman in paper. Afterwards we worked with Figma
                to create actual designs of the web app. We chose the following colors scheme (thinking about a color
                associated to each nutrient) and the font was taken from GoogleFonts (Monstserrat).</p>

                <p> The logo is a toast with a tick on it, so it reflects both food, and the idea of tracking or
                    organizing. The toast itself will be used in different illustrations of the website such as the
                    searchBar</p>

                <h4 className="subtitle">Tech Stack</h4>

                <p> We used the following technology stack to develop this webapp:</p>
                    <ul className="stack-list">
                        <li><b>REACT:</b> as our frontend framework, using the following libraries</li>
                        <ul>
                            <li><b>Axios</b> - to fetch data</li>
                            <li><b>Firebase</b> - database use</li>
                            <li><b>materialize-css</b> - just for the login Modal and inputs</li>
                            <li><b>node-sass</b> - to use scss for styling</li>
                            <li><b>react-router-dom</b> - to navigate through our pages</li>
                            <li><b>sweet-alert</b> - for feedback pop ups</li>
                            <li><b>font-awesome</b> - for icons</li>
                        </ul>
                        <li><b>FIREBASE:</b> as our noSQL database system</li>
                        <li><b>SCSS:</b> All the sytling for this webpage except things like the modals was done by using
                        plain CSS.</li>
                        <li><b>EDAMAM API:</b> For our food nutrition date retrieval.</li>
                    </ul>

                <h4 className="subtitle">Main features</h4>

                <p>
                    Our application has a lot of functionalities and features, but our main ones are the following:
                </p>

                <ul className="stack-list">
                    <li><b>AUTH AND PROFILE:</b> We used firabase to make the user able to Login, Register, Forget Password, Edit Profile,
                    Change Password, Change email... </li>
                    <li><b>SEARCHBAR:</b> By using EDAMAM API we can search for any food and get a list of related items and their nutrition
                     values. Additionally we can modify the quantity of grams and the proportional nutrition will be automatically updated.</li>
                    <li><b>DRAG-N-DROP:</b>  -----AARON write here a little thing of how it works-----</li>
                    <li><b>NUTRITION CALCULATION:</b> A user's recommended nutrition intake is calculated based on factors such as their height, weight, age, gender and
                        activity level. From there we researched formulas to find accurate nutrition recommendations based on these inputs. <br/>
                        We also did research into different diets and scaled a user's recommended nutrient levels according to the diet plan that they chose.</li>
                    <li><b>NUTRITION BARS:</b> Everytime we add/delete an item/row, the nutrition bars will be numerically and visually updated.
                    After saving the tamplate, everytime we confirma meal it will also update the bars.</li>
                </ul>
            </div>
        );
    }
}