import React from 'react';
import SearchBar from './searchBar';
import WeekPlan from './weekPlan';
import NutriScore from './nutriScore';
import CreatePlan from "./createPlan";
import DragDropBox from "./DragDropBox";
// import DragDropTest from './DragDropTest';
// import InitialBox from "./testY";

export default class MealPlannerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowcount: 1,
            mealplansaved: false,
            creationcheck: false,
            rows: [
                <tr key="row0">
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                </tr>
            ]
        };
        this.addRow = this.addRow.bind(this);
    }

    addRow() {
        let joined = this.state.rows.concat(
            <tr key={"row"+this.state.rowcount}>
                <td>
                    <DragDropBox/>
                </td>
                <td>
                    <DragDropBox/>
                </td>
                <td>
                    <DragDropBox/>
                </td>
                <td>
                    <DragDropBox/>
                </td>
                <td>
                    <DragDropBox/>
                </td>
                <td>
                    <DragDropBox/>
                </td>
                <td>
                    <DragDropBox/>
                </td>
            </tr>
        );
        this.setState({ rows: joined,
        rowcount: (++this.state.rowcount)})
    }

    //Performs the creation process changing the view depending if the user has a mealplan saved or not
    createProcess() {
        if(this.state.mealplansaved){
            return (
                <div className="view">
                    <SearchBar/>
                    <WeekPlan rows={this.state.rows}/>
                    <NutriScore/>
                </div>
            )
        }
        else {
            if(this.state.creationcheck == true){
                return (
                    <div className="view">
                        <SearchBar/>
                        <WeekPlan rows={this.state.rows}/>
                        <div className="btn-group">
                            <button className="btn-login" onClick={this.addRow}>ADD</button>
                            <button className="btn-login" onClick={this.addRow}>REMOVE</button>
                        </div>
                        <NutriScore/>
                    </div>
                )
            }
            else{
                return (
                    <div className="view create-help">
                        <h3 className="title">Create your first meal plan</h3>
                        <div className="help-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco la
                            çboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in vo
                            luptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco la
                            çboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in vo
                            luptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                        <span className="btn-login" onClick={()=>this.setState({creationcheck: true})}>Create your mealplan</span>
                    </div>
                )
            }
        }
    }

    render() {
        console.log(this);
        return (
            this.createProcess()
        );
    }
}