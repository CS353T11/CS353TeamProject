import React from 'react';
import logo from './logo.svg';
import './App.css';

class LoginForm extends React.Component{
    constructor(props) {
        super (props);
        this.state = {
            username: '',
            password: ''
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        alert("You are submitting username: " + this.state.username + ", and password: " + this.state.password);
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div id="logIn">
                <form onSubmit={this.handleSubmit}>
                    <label>Username </label>
                    <input type="text" name="username" onChange={this.handleChange}/><br/>
                    <label>Password </label>
                    <input type="password" name="password" onChange={this.handleChange}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
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
        <LoginForm/>
        <PlannerView/>
        <GoalsView/>
      </div>
  );
}

export default App;
