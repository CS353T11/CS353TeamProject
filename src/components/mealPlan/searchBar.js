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
					<div className="iconClick" onClick={this.keyPressed}>
                    </div>
                </div>
                <div className="search-results">

                    {this.state.results.hints && this.state.results.hints!=="" ?
                        this.state.results.hints.slice(0,6).map((obj,index) => {
							console.log(obj.food);
							console.log(index);
                            return (
                                <div className="api-item" key={"foodRes"+index} id={"foodRes"+index}>
									<h3>{obj.food.label}</h3>
									<div id={"foodNutr"+index}>
										Calories:{" "+obj.food.nutrients.ENERC_KCAL+"\n"}
										Carbs:{" "+obj.food.nutrients.CHOCDF+"\n"}
										Fat:{" "+obj.food.nutrients.FAT+"\n"}
										Protein:{" "+obj.food.nutrients.PROCNT+"\n"}
                                        {/*TODO: Add Error avoidance by check if measure.label exists*/}
										{/*<span style={{fontWeight:"bold"}}>Quantity:*/}
										{/*	{" "+this.state.results.parsed[0].quantity*/}
										{/*	+this.state.results.parsed[0].measure.label}</span>*/}
									</div>
                                </div>
                            );
                        }) :
                        (
                            <div>

                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
}