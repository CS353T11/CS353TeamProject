import React from 'react';
import {TextInput} from 'react-materialize';
import axios from 'axios'
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
        if (event.key === "Enter") {
			let urlFood=encodeURI(this.state.searchTerm);
            //making a hard coded post request for an apple
            let results = await axios.get("https://api.edamam.com/api/food-database/parser?ingr="+urlFood+"&app_id=9ccfd3ea&app_key=422e0ba66ae6c563f47a9fe391a437f0")
                .then(function(response){
                    console.log("----------Response JSON----------");
                    console.table(response.data);
                    console.log("---------------------------------");
                    var obj=response.data;
                    //var objs;
                    //console.log(data.hints[0].measures[1].label);

                    return obj;
                })
                .catch(function(error){
                    console.log(error);
            })

			this.setState({
				results: results
			})
        }
    }

    render() {
		console.log(this.state);
        return (
            <div className="searchbar">
                <div className="search-header">
                    <h3 className="search-title">Search your meals</h3>
                    <TextInput placeholder=" eg. Apple" icon="search" className="search-input" id="searchTerm"
							   onKeyPress={this.keyPressed} onChange={this.handleChange}/>
                </div>
                <div className="search-results">

                    {this.state.results.hints ?
                        this.state.results.hints.map((obj,index) => {
                            return (
                                <div className="api-item" key={index}>
                                    {obj.food.label}
                                </div>
                            );
                        }) :
                        (
                            <div className="api-item" >

                            </div>
                        )
                    }




                </div>
            </div>
        );
    }
}