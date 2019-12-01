import React from 'react';
import SearchBar from './searchBar';
import WeekPlan from './weekPlan';
import NutriScore from './nutriScore';
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
                        <DragDropBox/>
                        <DragDropBox/>
                        <DragDropBox/>
                        <DragDropBox/>
                        <DragDropBox/>
                        <DragDropBox/>
                        <DragDropBox/>
                </tr>
            ]
        };
        this.addRow = this.addRow.bind(this);
        this.saveMealplan = this.saveMealplan.bind(this);
        this.deleteMealplan = this.deleteMealplan.bind(this)
    }

    async componentDidMount() {
        await this.addRow();
        await this.addRow();

        //Retrieve from the database if the user already has a mealplan
    }

    addRow() {
        let joined = this.state.rows.concat(
            <tr key={"row"+this.state.rowcount}>
                <DragDropBox/>
                <DragDropBox/>
                <DragDropBox/>
                <DragDropBox/>
                <DragDropBox/>
                <DragDropBox/>
                <DragDropBox/>
            </tr>
        );
        this.setState({ rows: joined,
        rowcount: (++this.state.rowcount)})
    }

    saveMealplan(){
        this.setState({mealplansaved: true});

        //Here we should do the thing with the database
    }

    async deleteMealplan(){

        await this.setState({mealplansaved: false,
        rows: [], rowcount: 0});
        await this.addRow();
        await this.addRow();
        await this.addRow();
        //Here we should do the thing with the database
    }

    //Performs the creation process changing the view depending if the user has a mealplan saved or not
    createProcess() {
        if(this.state.mealplansaved){
            return (
                <div className="view">
                    <SearchBar/>
                    <WeekPlan rows={this.state.rows}/>
                    <div className="mp-settings">
                        <span className="btn-login del" onClick={this.deleteMealplan}>DELETE</span>
                        <span className="btn-login save" onClick={this.saveMealplan}>SAVE</span>
                    </div>
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
                        <div className="mp-settings">
                            <span className="btn-login add" onClick={this.addRow}>ADD</span>
                            <span className="btn-login rm" onClick={this.addRow}>REMOVE</span>
                            <span className="btn-login del" onClick={this.deleteMealplan}>DELETE</span>
                            <span className="btn-login save" onClick={this.saveMealplan}>SAVE</span>
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