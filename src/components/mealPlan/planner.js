import React from 'react';
import SearchBar from './searchBar';
import WeekPlan from './weekPlan';
import NutriScore from './nutriSoure';

export default class Planner extends React.Component {
    render() {
        return (
            <div id="main">
                <h1>Plan My Meal</h1>
                View Profile
                <SearchBar/>
                <WeekPlan/>
                <NutriScore/>
            </div>
        );
    }
}