import React from 'react';
import SearchBar from './searchBar';
import WeekPlan from './weekPlan';
import NutriScore from './nutriScore';
// import DragDropTest from './DragDropTest';
// import InitialBox from "./testY";

export default class MealPlannerPage extends React.Component {
    render() {
        /* Debug with DragDrop test component
          <DragDrop id="board2" className="dragDropTest">
           </DragDrop>
         */
        return (
            <div className="view">
                <SearchBar/>
                <WeekPlan/>
                <NutriScore/>
            </div>
        );
    }
}