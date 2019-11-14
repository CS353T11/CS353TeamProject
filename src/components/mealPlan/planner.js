import React from 'react';
import SearchBar from './searchBar';
import WeekPlan from './weekPlan';
import NutriScore from './nutriScore';

export default class Planner extends React.Component {
    render() {
        return (
            <div className="view">
                <SearchBar/>
                <WeekPlan/>
                <NutriScore/>
            </div>
        );
    }
}