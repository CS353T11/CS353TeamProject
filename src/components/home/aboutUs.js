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
                <p> Planmy.ml was a project created for our CS353 Team Project module in Maynooth University. The aim
                    of the module was to create a Web App, using tech stacks we haven't used before, in an organised
                    manner with a group of people. A key component being the use of agile development or more specifically
                    SCRUM within our team.
                    </p>
                <p> The whole project was developed over the span of 3 months by 6 students (Group 11): Aaron, Ayman
                , Jake, Enming, Luke and Giorgio. </p>

                <h4 className="subtitle">Design</h4>

                <p> The idea and the first sketches were drawn by Ayman on paper. Afterwards we worked with Figma
                to create actual designs of the web app. We chose the following color scheme, thinking about color
                and their association to each nutrient as well as a modern accessible font, Montserrat.</p>

                <p> The logo is a toast with a tick on it, so it reflects both food, and the idea of tracking or
                    organizing a persons meals. The toast icon itself is used in different illustrations
                    across the website, such as the search bar. <span style={{fontStyle:"italic", fontSize:"14px"}}>Try
                        looking for a food that doesn't exist </span>
                    <span style={{fontSize:"16px"}}>😉</span></p>

                <h4 className="subtitle">Tech Stack</h4>

                <p> We used the following technology stack to develop this Web App:</p>
                    <ul className="stack-list">
                        <li><b>REACT:</b> as our frontend framework, using the following libraries</li>
                        <ul>
                            <li><b>Axios</b> - for Get/Post Requests</li>
                            <li><b>Materialize-css</b> - For styling interactivity</li>
                            <li><b>react-router-dom</b> - For Page Navigation</li>
                            <li><b>sweet-alert</b> - For user feedback/confirmation dialogs</li>
                            <li><b>font-awesome</b> - For icons</li>
                        </ul>
                        <li><b>FIREBASE:</b> Our NoSql database</li>
                        <li><b>SASS:</b> Style sheet framework in which a lot of our style was made in</li>
                        <li><b>EDAMAM API:</b> As our food and nutrition API</li>
                    </ul>

                <h4 className="subtitle">Main features</h4>

                <p>
                    Our app has tons of functionality and features, but we believe our strongest ones are:
                </p>

                <ul className="stack-list">
                    <li><b>User Authentication and Profile:</b> We used Firebase for user authentication and have a
                        fully fledged login/create account system with email verification for password changes. Moreover
                        we store submitted information about the user such as height, weight, activity level etc.</li>
                    <li><b>Food Search bar:</b> By using EDAMAM API we can search for any food and get a list of related items and their nutrition
                     values. Additionally we can modify the quantity of grams and the proportional nutrition will be automatically updated.
                    The API includes a natural speech recognition engine which helps give accurate search results
                    no matter the users dialect.</li>
                    <li><b>Drag-N-Drop:</b> Using new HTML5 functions, we allow users to drag/drop food they searched
                    for into their meal plans, without the use of 3rd party libraries. Each food item is mapped in a
                    way that resembles the database structure for easy saving/retrieving of users diets.</li>
                    <li><b>Nutrition calculation:</b> A user's recommended nutrition intake is calculated based on factors
                        such as their height, weight, age, gender and activity level. From our researched formulas, we
                        calculate accurate nutrition recommendations based on these factors. <br/>
                        We also did research into different diets and scaled a user's recommended nutrient levels
                        according to the diet plan that they chose. Some example diets are "Maintain Weight", if the
                    user wishes to maintain weight and "Ketogenic" for a high fat, low carbohydrate diet.</li>
                    <li><b>Nutrition graphing:</b> Every time a user adds/deletes items, the nutrition bars
                        will dynamically update to the graph the users nutrition intake against their desired diet.
                    </li>
                </ul>
                <h5 className="title" style={{marginTop:"60px"}}>Got this far?</h5>
                <h5 className="title">🎉 Thank you for reading! 🎉</h5>

            </div>
        );
    }
}