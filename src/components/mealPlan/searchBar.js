import React from 'react';
import {TextInput} from 'react-materialize';
import axios from 'axios'
export default class SearchBar extends React.Component {

    constructor(props){
        super(props);
    }
    keyPressed(event) {
        if (event.key === "Enter") {
            alert("Lets a GOOoooo");
            //making a hard coded post request for an apple
            axios.get("https://api.edamam.com/api/food-database/parser?ingr=apple&app_id=9ccfd3ea&app_key=422e0ba66ae6c563f47a9fe391a437f0")
                .then(function(response){
                    console.log("----------Response JSON----------");
                    console.table(response);
                    console.log("---------------------------------");
                    var obj=response;
                    //var objs;
                    //console.log(data.hints[0].measures[1].label);
                    var foodId;
                    {Object.keys().map()}

                    /*$.each(obj, function (key, value) {
                        if(key=="hints"){
                            //objs=value[0];
                            console.log("----------Food JSON----------");
                            console.log(value[0]);
                            console.log("-----------------------------");
                            foodId=value[0].food.foodId;
                            console.log("Food Id: "+foodId);
                        }
                    });*/
                })
                .catch(function(error){
                    console.log(error);
            })

        }
    }

    render() {
        return (
            <div className="searchbar">
                <div className="search-header">
                    <h3 className="search-title">Search your meals</h3>
                    <TextInput placeholder=" eg. Apple" icon="search" className="search-input" onKeyPress={this.keyPressed}/>
                </div>
                <div className="search-results">

                    <div className="api-item">
                    </div>

                    <div className="api-item">
                    </div>
                    <div className="api-item">
                    </div>

                    <div className="api-item">
                    </div>

                    <div className="api-item">
                    </div>

                    <div className="api-item">
                    </div>
                </div>
            </div>
        );
    }
}