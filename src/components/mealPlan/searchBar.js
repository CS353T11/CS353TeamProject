import React from 'react'
export default class SearchBar extends React.Component {
    render() {
        return (
            <div className="searchbar">
                <div className="search-header">
                    <h3 className="search-title">Search your meals</h3>
                    <input className="input search-input"></input>
                    <a className="btn-hide"> </a>
                </div>
                <div className="search-results">
                    <div className="api-item">
                        <img alt="tomato"></img>
                        <p>Food</p>
                    </div>

                    <div className="api-item">
                        <img alt="tomato"></img>
                        <p>Food</p>
                    </div>

                    <div className="api-item">
                        <img alt="tomato"></img>
                        <p>Food</p>
                    </div>

                    <div className="api-item">
                        <img alt="tomato"></img>
                        <p>Food</p>
                    </div>

                    <div className="api-item">
                        <img alt="tomato"></img>
                        <p>Food</p>
                    </div>

                    <div className="api-item">
                        <img alt="tomato"></img>
                        <p>Food</p>
                    </div>
                </div>
            </div>
        );
    }
}