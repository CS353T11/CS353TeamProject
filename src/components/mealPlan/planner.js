import React from 'react';
import SearchBar from './searchBar';
import WeekPlan from './weekPlan';
import NutriScore from './nutriScore';
import DragDrop from './dragDropTest';

export default class Planner extends React.Component {
    render() {
        return (
            <div className="view">
                <SearchBar/>
                <DragDrop/>
                <WeekPlan/>
                <NutriScore/>
            </div>
        );
    }
}