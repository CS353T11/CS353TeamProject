import React from 'react';
import {TextInput} from 'react-materialize';
import axios from 'axios';
import SearchResultTile from "./SearchResultTile";
import firebase from '../firebase/firebase';
import noresults from '../../images/toast.svg';
import nosearch from '../../images/toast2.svg';

export default class SearchBar extends React.Component {

    constructor(props){
        super(props);
		this.state = {
			searchTerm: '',         // Search term written in the input
			results: '',            // Array of results
            qtyGrams: 100,          // Quantity specified (in grams)
            lastSearch: '',         // Last query (to avoid unnecessary calls to API)
		}
    }

	/* This updates the state whenever we change a form value in the SearchBar*/
	handleChange = (e) => {
        let val = e.target.value;
        if(e.target.id === "qtyGrams"){
            val = (+e.target.value);
        }
		this.setState({
			[e.target.id]: val
		})
	}

    /*Rounds a number to only 2 decimals*/
	round = (value, exp) => {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return 0;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    }

    /* Handles the search query*/
    keyPressed = async (event) => {
        // If the user clicks on search or presses "Enter"
        if ((event.key === "Enter" || event.type === "click") && this.state.lastSearch !== this.state.searchTerm) {
            document.body.style.cursor = "progress";

            // Calls the EDAMAM API with the searchTerm
			let urlFood=encodeURI(this.state.searchTerm);
            let results= await axios.get("https://api.edamam.com/api/food-database/parser?ingr="
                +urlFood+"&app_id=9ccfd3ea&app_key=422e0ba66ae6c563f47a9fe391a437f0")
                .then(function(response){

                    // If there are results
                    console.log("----------Response JSON----------");
                    console.log(response.data);
                    console.log("---------------------------------");

                    let obj=response.data;
                    return obj;
                })
                .catch(function(error){
                    // If there are not results
                    console.log(error);
                    return "Error 400";
            })

            // If there are results, update state with the array of results
            if(results !== "Error 400"){
                this.setState({
                    results: results,
                    lastSearch: this.state.searchTerm,
                })
                document.body.style.cursor = "default";

            }else{
                //If there isn't a search term
                console.log("Empty Search Parameters!");
                document.body.style.cursor = "default";
            }
        }
    }

    //TODO: Add functionality that prevents multiple calls to the api at a time with a clear loading indicator

    render() {
		//console.log(this.state);
        return (
            <div className="searchbar">
                <div className="search-header">
                    <h3 className="search-title">Search your meals</h3>
                    <TextInput placeholder="Search..." icon="search" className="search-input" id="searchTerm"
                               onKeyPress={this.keyPressed} onChange={this.handleChange}/>
					<div className="icon-click" onClick={this.keyPressed}>
                    </div>
                    <input className="qty-input" id="qtyGrams" type="number" step="10" min="0" placeholder="100"
                           onChange={this.handleChange}></input>
                    <p className="qty-label" > g</p>
                </div>
                <div className="search-results">

                    {this.state.results.hints && this.state.results.hints!=="" ?
                        this.state.results.hints.map((obj,index) => {
                            // Maps every item values to a SearchResultTile, and calculates values depending on the Qty specified
                            return (
                                    <SearchResultTile
                                        id={"foodRes"+index}
                                        key={"foodRes"+index}
                                        draggable="true"
                                        index={index}
                                        label={obj.food.label}
                                        foodId={obj.food.foodId}
                                        Cal={this.round(obj.food.nutrients.ENERC_KCAL*(this.state.qtyGrams/100), 2)}
                                        Fat={this.round(obj.food.nutrients.FAT*(this.state.qtyGrams/100), 2)}
                                        Carbs={this.round(obj.food.nutrients.CHOCDF*(this.state.qtyGrams/100), 2)}
                                        Pro={this.round(obj.food.nutrients.PROCNT*(this.state.qtyGrams/100), 2)}
                                        Qty={this.state.qtyGrams}
                                    />
                            );
                        }) :
                        (
                            <div className="empty-results">
                                <img alt="happy toast" className="toast2" src={nosearch}></img>
                                <p className="message">Search meals</p>
                            </div>
                        )
                    }

                    {
                        (this.state.results.hints && this.state.results.hints.length <= 0) ?
                            (
                                <div className="empty-results">
                                    <img alt="burned toast" className="toast" src={noresults}></img>
                                    <p className="message">No results</p>
                                </div>
                            ) : null
                    }

                </div>
            </div>
        );
    }
}