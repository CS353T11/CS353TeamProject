import React from 'react';
import {TextInput} from 'react-materialize';
export default class SearchBar extends React.Component {
    constructor(props){
        super(props);
    }
    keyPressed(event) {
        if (event.key === "Enter") {
            alert("Yooooo");
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