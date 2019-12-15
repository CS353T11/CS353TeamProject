import React from 'react';
import SearchBar from './searchBar';
import WeekPlan from './weekPlan';
import NutriScore from './nutriScore';
import DragDropBox from "./DragDropBox";
import firebase from '../firebase/firebase';
import {mealPlan} from '../firebase/firebase';
import {addMealPlanDoc, saveMealPlanTemplate} from "../firebase/DbObjectsMethods";
import loadingSvg from '../../images/loading.svg';
import plan1 from "../../images/plan1.gif";

export default class MealPlannerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:"",                     /* User ID*/
            rowcount: 1,                /* Number of rows*/
            mealplansaved: false,       /* Checks if the plan is being created or it's already saved*/
            creationcheck: '',          /* Checks if the user ever created a plan or if its their first*/
            totalNutrPlan:  {           /* Nutrition values for the created plan */
                kcal: 0,
                prots: 0,
                carbs: 0,
                fats: 0,
            },
            totalNutrReal:  {           /* Nutrition values for the actual eating meals during the week */
                kcal: 0,
                prots: 0,
                carbs: 0,
                fats: 0,
            },
            totalNutrRecomended:  {     /* Nutrition values for the the recommended diet depending on user data */
                kcal: 0,
                prots: 0,
                carbs: 0,
                fats: 0,
            },
            nutritionValues: [],        /* Array with nutrition values for every tile */
            cachedMeals:{
                monday:{},
                tuesday:{},
                wednesday:{},
                thursday:{},
                friday:{},
                saturday:{},
                sunday:{}
            },
            rows: [],                   /* Html rows */
            tilesCached:false,
        };
        this.addRow = this.addRow.bind(this);
        this.saveMealplan = this.saveMealplan.bind(this);
        this.deleteMealplan = this.deleteMealplan.bind(this);
        this.getTotalNutr = this.getTotalNutr.bind(this);
        this.cacheTile=this.cacheTile.bind(this);
    }

    async componentDidMount() {
        await firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let userID=user.uid;
                this.setState({ uid:userID});
                console.log("User:"+userID+" is logged in.");

                //Retrieves the recommended values
                firebase.firestore().collection('profiles').doc(user.uid).get().then(doc => {
                    let user_info = doc.data();

                    this.setState({
                        totalNutrRecomended:  {     /* Nutrition values for the the recommended diet depending on user data */
                            kcal: (user_info.calories*7),
                            prots:  (user_info.protein*7),
                            carbs:  (user_info.carbs*7),
                            fats:  (user_info.fats*7),
                        },
                    });

                });
                //console.log(this.state)

                /*Retrieve from the database if the user already has a mealplan*/
                mealPlan.doc(userID).collection("Template").doc("default").get()
                    .then(doc => {
                        if(doc.exists){
                            this.setState({creationcheck:true}); //MealPlan was already created
                            console.log("Retrieving Meal Plan...");
                            console.log("MealPlan",doc.data());
                            this.state.cachedMeals=doc.data();
                            this.saveMealplan();
                            this.addRow();
                            this.addRow();
                            this.addRow();
                        }else {
                            this.setState({creationcheck:false});
                        }

                    })
            }

        })
    }

    /*
    This function is used whenever we add a new item to the mealplan. It will get the nutrition of that tile and update
     */
    async getTotalNutr(tileNutr, key){
        let totalNutrWeek;

        if(tileNutr){
            /*console.log("TILE NUTR:");
            console.log(tileNutr);*/

            this.state.nutritionValues[key] = tileNutr;
            ++this.state.nutritionValues.length;
        }

        if(this.state.nutritionValues.length > 1){
            let foodArray = this.state.nutritionValues;
            foodArray = Object.keys(foodArray).map(key => {
                if(foodArray[key] !== 0) {
                    let {cal, fat, pro, carbs} = foodArray[key];
                    return {
                        cal, fat, pro, carbs
                    };
                }else {
                    return 0;
                }
            });
            totalNutrWeek = foodArray.reduce((a,b) => {
                if(a && b) {
                    //console.log(a, b);
                    return ({
                        cal: a.cal + b.cal,
                        fat: a.fat + b.fat,
                        pro: a.pro + b.pro,
                        carbs: a.carbs + b.carbs,
                    });
                }else {
                    return null;
                }
            });
        }
        else {
            totalNutrWeek = tileNutr;
        }

        // console.log("!Nutrition per day & row");
        // console.log(this.state.nutritionValues);
        // console.log("!Total Nutrition Calc");
        // console.log(totalNutrWeek);

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

    //could be combined into getTotalNutr, but would need to loop through every array item in each cell so possibly
    //just as if not faster to have seperate methods, 'getTotalNutr' and 'cacheTile' for retrieving the
    //total nutrition and descriptions of foods respectively in each tile.
    async cacheTile(grpFood, key){
        let split=key.split(":");
        let day=split[0];
        let meal=split[1];
        if(grpFood){
            let cachedMealsDay=this.state.cachedMeals[day];
            Object.assign(cachedMealsDay,{[meal]:grpFood});
            this.state.cachedMeals[day]=cachedMealsDay;
            //console.warn(this.state.cachedMeals);
        }
        this.setState({tilesCached: true});
    }

    addRow() {
        let rowkey = "meal"+this.state.rowcount;
        //console.log(this.state.cachedMeals.tuesday["meal1"]);
        let joined = this.state.rows.concat(
            <tr key={rowkey}>
                <DragDropBox index={"monday:"+rowkey} getTotalNutr={this.getTotalNutr} cacheTile={this.cacheTile} foodObjProp={this.state.cachedMeals.monday[rowkey]}/>
                <DragDropBox index={"tuesday:"+rowkey} getTotalNutr={this.getTotalNutr} cacheTile={this.cacheTile} foodObjProp={this.state.cachedMeals.tuesday[rowkey]}/>
                <DragDropBox index={"wednesday:"+rowkey} getTotalNutr={this.getTotalNutr} cacheTile={this.cacheTile} foodObjProp={this.state.cachedMeals.wednesday[rowkey]}/>
                <DragDropBox index={"thursday:"+rowkey} getTotalNutr={this.getTotalNutr} cacheTile={this.cacheTile} foodObjProp={this.state.cachedMeals.thursday[rowkey]}/>
                <DragDropBox index={"friday:"+rowkey} getTotalNutr={this.getTotalNutr} cacheTile={this.cacheTile} foodObjProp={this.state.cachedMeals.friday[rowkey]}/>
                <DragDropBox index={"saturday:"+rowkey} getTotalNutr={this.getTotalNutr} cacheTile={this.cacheTile} foodObjProp={this.state.cachedMeals.saturday[rowkey]}/>
                <DragDropBox index={"sunday:"+rowkey} getTotalNutr={this.getTotalNutr} cacheTile={this.cacheTile} foodObjProp={this.state.cachedMeals.sunday[rowkey]}/>
            </tr>
        );
        this.setState({ rows: joined,
        rowcount: (this.state.rowcount + 1)})
    }

    async removeRow() {
        let newRows = this.state.rows;
        let rowkey = "meal"+(this.state.rowcount-1);
        let newNutritionValues = [];
        let index,i;

        console.log(this.state.nutritionValues);

        //This takes out from the list all the items that where in the row we are deleting
        for(index in this.state.nutritionValues){
            i = index.slice(-5);
            console.log(i,rowkey);
            if(i !== rowkey){
                newNutritionValues[index] = this.state.nutritionValues[index];
            }
        }
        console.log(newNutritionValues);
        newRows.pop();

        let totalNutrWeek;
        let foodArray = newNutritionValues;

        // We calculate again the nutrition values
        foodArray = Object.keys(foodArray).map(key => {
            if(foodArray[key] !== 0) {
                let {cal, fat, pro, carbs} = foodArray[key];
                return {
                    cal, fat, pro, carbs
                };
            }else {
                return 0;
            }
        });
        if(foodArray.length > 1) {
            totalNutrWeek = foodArray.reduce((a, b) => {
                if (a && b) {
                    //console.log(a, b);
                    return ({
                        cal: a.cal + b.cal,
                        fat: a.fat + b.fat,
                        pro: a.pro + b.pro,
                        carbs: a.carbs + b.carbs,
                    });
                }else {
                    return null;
                }
            });
        }else {
            if(foodArray.length === 0){
                foodArray =foodArray.concat({
                    cal: 0,
                    fat: 0,
                    pro: 0,
                    carbs: 0,
                });
            }
            totalNutrWeek = foodArray[0];
        }

        await this.setState({
            rows: newRows,
            rowcount: (--this.state.rowcount),
            nutritionValues: newNutritionValues,
            totalNutrPlan:  {
                kcal: totalNutrWeek.cal,
                prots: totalNutrWeek.pro,
                carbs: totalNutrWeek.carbs,
                fats: totalNutrWeek.fat,
            },
        })
    }

    saveMealplan(){
        //TODO: Save 'actual items' when they are added vs an explicity save button for changing template/diet
        this.setState({mealplansaved: true});

        //has tiles been cached?
        if(this.state.tilesCached){
            let userID=this.state.uid;
            saveMealPlanTemplate(userID,this.state.cachedMeals);
        }else{
            //console.warn("There is no items to save in your meal plan");
        }
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

    editButton(){
        this.setState({
            mealplansaved: false,
        });
    }

    async deleteMealplan(){
        await this.setState({
            rowcount: 1,
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
                        <span className="btn-login edit" onClick={() => this.editButton()}>EDIT</span>
                        <span className="btn-login save" onClick={this.saveMealplan}>SAVE</span>
                    </div>
                    <NutriScore planned_values={this.state.totalNutrRecomended} actual_values={this.state.totalNutrReal}/>
                </div>
            )
        }
        else {
            if(this.state.creationcheck === true){
                return (
                    <div className="view">
                        <SearchBar/>
                        <WeekPlan rows={this.state.rows}/>
                        <div className="mp-settings">
                            <span className="btn-login add" onClick={this.addRow}>ADD</span>
                            <span className="btn-login rm" onClick={() => this.removeRow()}>REMOVE</span>
                            <span className="btn-login del" onClick={this.deleteMealplan}>DELETE</span>
                            <span className="btn-login save" onClick={this.saveMealplan}>SAVE</span>
                        </div>
                        <NutriScore planned_values={this.state.totalNutrRecomended} actual_values={this.state.totalNutrPlan}/>
                    </div>
                )
            }
            else if(this.state.creationcheck === false){
                return (
                    <div className="view create-help">
                        <div className="help-pic">
                           <img src={plan1} alt="screenshot - gif of how it works"></img>
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
            else {
                return (
                    <div className="view create-help">
                        <img src={loadingSvg} alt="Loading..." className="loadingSvg"/>
                    </div>
                )
            }
        }
    }

    render() {
       // console.log(this);
        return (
            this.createProcess()
        );
    }
}