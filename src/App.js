import React from 'react';
import logo from './logo.svg';
import './App.css';

function LoginView() {
  return (
      <div id="landing">
          <form>
              <label>Username </label>
              <input type="text" name="username" />
              <label>Password</label>
              <input type="text" name="password" />
          </form>
      </div>
  );
}

function GoalsView() {
  return (
      <div id="results">
        will show the results of the users nutrition.
      </div>
  );
}

function PlannerView() {
  return (
      <div id="main">
        <h1>Plan My Meal</h1>
        View Profile
        <SearchBar/>
        <WeekPlan/>
        <Nutrition/>
      </div>
  );
}


function WeekPlan() {
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

function SearchBar() {
  return (
      <div className="search">
        Search Meal:
      </div>
  );
}

function Nutrition() {
  return (
      <div id="results">
        will show the results of the users nutrition.
      </div>
  );
}



function App() {
  return (
      <div className="App">
        <LoginView/>
        <PlannerView/>
        <GoalsView/>
      </div>
  );
}

export default App;
