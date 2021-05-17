# CS353TeamProject
<h1>About</h1>
[Planmy.ml](https://planmyml.firebaseapp.com/) was a project created for our CS353 Team Project module in Maynooth University. The aim of the module was to create a Web App, using tech stacks we haven't used before, in an organised manner with a group of people. A key component being the use of agile development or more specifically SCRUM within our team.

The whole project was developed over the span of 3 months by 6 students (Group 11): Aaron, Ayman , Jake, Enming, Luke and Giorgio.

<h1>Design</h1>
The idea and the first sketches were drawn by Ayman on paper. Afterwards we worked with Figma to create actual designs of the web app. We chose the following color scheme, thinking about color and their association to each nutrient as well as a modern accessible font, Montserrat.

The logo is a toast with a tick on it, so it reflects both food, and the idea of tracking or organizing a persons meals. The toast icon itself is used in different illustrations across the website, such as the search bar.

<h1>Main features</h1>
Our app has tons of functionality and features, but we believe our strongest ones are:
<ul>
<li>User Authentication and Profile: We used Firebase for user authentication and have a fully fledged login/create account system with email verification for password changes. Moreover we store submitted information about the user such as height, weight, activity level etc.
<li>Food Search bar: By using EDAMAM API we can search for any food and get a list of related items and their nutrition values. Additionally we can modify the quantity of grams and the proportional nutrition will be automatically updated. The API includes a natural speech recognition engine which helps give accurate search results no matter the users dialect.
<li>Drag-N-Drop: Using new HTML5 functions, we allow users to drag/drop food they searched for into their meal plans, without the use of 3rd party libraries. Each food item is mapped in a way that resembles the database structure for easy saving/retrieving of users diets.
<li>Nutrition calculation: A user's recommended nutrition intake is calculated based on factors such as their height, weight, age, gender and activity level. From our researched formulas, we calculate accurate nutrition recommendations based on these factors.
<li>We also did research into different diets and scaled a user's recommended nutrient levels according to the diet plan that they chose. Some example diets are "Maintain Weight", if the user wishes to maintain weight and "Ketogenic" for a high fat, low carbohydrate diet.
<li>Nutrition graphing: Every time a user adds/deletes items, the nutrition bars will dynamically update to the graph the users nutrition intake against their desired diet.
</ul>


<h1>Tech Stack</h1>
We used the following technology stack to develop this Web App:
<ul>
<li>REACT: as our frontend framework, using the following libraries
  <ul>
  <li>Axios - for Get/Post Requests
  <li>Materialize-css - For styling interactivity
  <li>react-router-dom - For Page Navigation
  <li>sweet-alert - For user feedback/confirmation dialogs
    <li>font-awesome - For icons</ul>
<li>FIREBASE: Our NoSql database
<li>SASS: Style sheet framework in which a lot of our style was made in
<li>EDAMAM API: As our food and nutrition API</ul>
