import React from 'react';
import {TextInput} from 'react-materialize';
import axios from 'axios';
export default class SearchBar extends React.Component {

    constructor(props){
        super(props);
		this.state = {
			searchTerm: '',
			results: '',
		}
    }

	//change the state when the content change in the form
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	//Rounds a number to only "exp" decimals : https://stackoverflow.com/questions/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript
	round = (value, exp) => {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    }

     keyPressed = async (event) => {
        if (event.key === "Enter" || event.type === "click") {
            document.body.style.cursor = "progress";
			let urlFood=encodeURI(this.state.searchTerm);
            //making a hard coded post request for an apple
            let results=await axios.get("https://api.edamam.com/api/food-database/parser?ingr="+urlFood+"&app_id=9ccfd3ea&app_key=422e0ba66ae6c563f47a9fe391a437f0")
                .then(function(response){
                    console.log("----------Response JSON----------");
                    console.log(response.data);
                    console.log("---------------------------------");
                    var obj=response.data;
                    //var objs;
                    //console.log(data.hints[0].measures[1].label);

                    return obj;
                })
                .catch(function(error){
                    console.log(error);
                    return "Error 400";
            })
            //stops from setting state when user inputs empty string
            if(results !== "Error 400"){
                this.setState({
                    results: results
                })
                document.body.style.cursor = "default";
            }else{
                console.log("Empty Search Parameters!");
                document.body.style.cursor = "default";
            }

        }
    }

    render() {
		//console.log(this.state);
        return (
            <div className="searchbar">
                <div className="search-header">
                    <h3 className="search-title">Search your meals</h3>
                    <TextInput placeholder=" eg. Apple" icon="search" className="search-input" id="searchTerm"
                               onKeyPress={this.keyPressed} onChange={this.handleChange}/>
					<div className="icon-click" onClick={this.keyPressed}>
                    </div>
                    <div className="qty-view">
                        {/*THIS IS NOT PROPERLY WORKING WE WILL HAVE TO THINK THE SOLUTION
                        {   (this.state.results.hints && this.state.results.hints!==""
                        && this.state.results.hints[0].quantity && this.state.results.hints[0].measure) ?
                         ("Qty: "+this.state.results.parsed[0].quantity+" "+this.state.results.parsed[0].measure.label)
                            :
                            "no qtyfied"
                        }
                        */}
                    </div>
                </div>
                <div className="search-results">

                    {this.state.results.hints && this.state.results.hints!=="" ?
                        this.state.results.hints.map((obj,index) => {
                            return (
                                <div className="api-item" key={"foodRes"+index} id={"foodRes"+index}>
									<h3 className="food-title">{obj.food.label}
                                        {/*TO DO: MARQUEE WHEN OVERFLOWING AND HOVERING*/}
									</h3>
									<div className="food-info" id={"foodNutr"+index}>
                                        <p className="info-line"><b className="nutrient-name">Calories</b>{this.round(obj.food.nutrients.ENERC_KCAL, 2)}kcal</p>
                                        <p className="info-line"><b className="nutrient-name">Fat</b>{this.round(obj.food.nutrients.FAT, 2)}g</p>
                                        <p className="info-line"><b className="nutrient-name">Carbs</b>{this.round(obj.food.nutrients.CHOCDF, 2)}g</p>
                                        <p className="info-line"><b className="nutrient-name">Protein</b>{this.round(obj.food.nutrients.PROCNT, 2)}g</p>
									</div>
                                </div>
                            );
                        }) :
                        (
                            <div>
                                   Search something! (we could add an ilustration)
                            </div>
                        )
                    }

                    {
                        (this.state.results.hints && this.state.results.hints.length <= 0) ?
                            (
                                <div>
                                    No results (we could add an ilustration)
                                </div>
                            ) : null
                    }

                </div>
            </div>
        );
    }
}