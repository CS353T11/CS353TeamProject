import React from 'react';
import SearchBar from './searchBar';
import WeekPlan from './weekPlan';
import NutriScore from './nutriScore';
import DragDropBox from "./DragDropBox";
import firebase from '../firebase/firebase';
import {db,mealPlan} from '../firebase/firebase';
import {addMealPlanDoc} from "../firebase/DbObjects";
// import DragDropTest from './DragDropTest';
// import InitialBox from "./testY";

export default class MealPlannerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:"",
            rowcount: 0,
            mealplansaved: false,
            creationcheck: false,
            totalNutrPlan:  {
                kcal: 0,
                prots: 0,
                carbs: 0,
                fats: 0,
            },
            totalNutrReal:  {
                kcal: 0,
                prots: 0,
                carbs: 0,
                fats: 0,
            },
            totalNutrRecomended:  {
                kcal: 2000*7,
                prots: 200*7,
                carbs: 100*7,
                fats: 80*7,
            },
            nutritionValues: [],
            rows: [],
        };
        this.addRow = this.addRow.bind(this);
        this.saveMealplan = this.saveMealplan.bind(this);
        this.deleteMealplan = this.deleteMealplan.bind(this);
        this.getTotalNutr = this.getTotalNutr.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // var user = firebase.auth().currentUser;
        // if(user){
        //     prevState.uid=user.uid;
        // }

    }

    async componentDidMount() {
        await this.addRow();
        await this.addRow();
        await this.addRow();
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let userID=user.uid;
                this.setState({ uid:userID});
                console.log("User:"+userID+" is logged in.");

                mealPlan.doc(userID).get()
                    .then(doc => {
                        if(doc.exists){
                            console.log("Retrieving Meal Plan...");
                            this.saveMealplan();
                        }

                    })
            }
        })
        //Retrieve from the database if the user already has a mealplan
    }

    getTotalNutr(tileNutr, key){
        let totalNutrWeek;

        this.state.nutritionValues[key] = tileNutr;
        ++this.state.nutritionValues.length;

        if(this.state.nutritionValues.length > 2){
            let foodArray = this.state.nutritionValues;
            foodArray = Object.keys(foodArray).map(key => {
                let { cal, fat, pro, carbs } = foodArray[key];
                return {
                    cal,fat,pro,carbs
                };
            });
            totalNutrWeek = foodArray.reduce((a,b) => {
                console.log(a,b);
                return ({
                    cal: a.cal + b.cal,
                    fat: a.fat + b.fat,
                    pro: a.pro + b.pro,
                    carbs: a.carbs + b.carbs,
                });
            });
        }
        else {
            totalNutrWeek = tileNutr;
        }

        console.log(this.state.nutritionValues);
        console.log("total");
        console.log(totalNutrWeek);

        this.setState(
            {nutritionValues: this.state.nutritionValues,
                totalNutrPlan:  {
                    kcal: totalNutrWeek.cal,
                    prots: totalNutrWeek.pro,
                    carbs: totalNutrWeek.carbs,
                    fats: totalNutrWeek.fat,
                },
        });
    }

    addRow() {
        let rowkey = "row"+this.state.rowcount;
        let joined = this.state.rows.concat(
            <tr key={rowkey}>
                <DragDropBox index={rowkey + "mon"} getTotalNutr={this.getTotalNutr}/>
                <DragDropBox index={rowkey + "tue"} getTotalNutr={this.getTotalNutr}/>
                <DragDropBox index={rowkey + "wed"} getTotalNutr={this.getTotalNutr}/>
                <DragDropBox index={rowkey + "thu"} getTotalNutr={this.getTotalNutr}/>
                <DragDropBox index={rowkey + "fri"} getTotalNutr={this.getTotalNutr}/>
                <DragDropBox index={rowkey + "sat"} getTotalNutr={this.getTotalNutr}/>
                <DragDropBox index={rowkey + "sun"} getTotalNutr={this.getTotalNutr}/>
            </tr>
        );
        this.setState({ rows: joined,
        rowcount: (++this.state.rowcount)})
    }

    saveMealplan(){
        this.setState({mealplansaved: true});
        //Here we should do the thing with the database
    }

    //for some reason only arrow function works here...
    createMealPlan=e=>{
        this.setState({creationcheck: true});
        if (this.state.uid!=="") {
            let userID=this.state.uid;
            //console.log("MY BOY -->" +userID);

            mealPlan.doc(userID).get()
                .then(doc => {
                    if(doc.exists){
                        console.log("huh...a meal plan already exists...");
                    }else{
                        console.log("creating meal plan for"+userID);
                        addMealPlanDoc(userID);
                    }
                })
        }
    }

    async deleteMealplan(){
        await this.setState({
            rowcount: 0,
            mealplansaved: false,
            creationcheck: true,
            totalNutrPlan:  {
                kcal: 0,
                prots: 0,
                carbs: 0,
                fats: 0,
            },
            nutritionValues: [],
            rows: [],});
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
                    <NutriScore planned_values={this.state.totalNutrRecomended} actual_values={this.state.totalNutrPlan}/>
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
                        <NutriScore planned_values={this.state.totalNutrRecomended} actual_values={this.state.totalNutrPlan}/>
                    </div>
                )
            }
            else{
                return (
                    <div className="view create-help">
                        <div className="help-pic">
                           <img alt="screenshot - gif of how it works"></img>
                        </div>
                        <div>
                            <h3 className="title">Create your first meal plan</h3>
                            <p>1. Search your meals in our food searcher</p>
                            <p>2. Drag them into your mealplan</p>
                            <p>3. Let our app calculate for you the total nutritional values.</p>
                            <p>Then, confirm your planned meals or edit them with your actual intake to see your real
                            values.</p>
                            <span className="btn-login" onClick={this.createMealPlan}>
                                Create your mealplan
                            </span>
                        </div>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            this.createProcess()
        );
    }
}