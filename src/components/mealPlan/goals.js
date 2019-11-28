import React from 'react'
import Avatar from "../../images/avatar.svg";
import {RadioGroup} from 'react-materialize';
export default class Goals extends React.Component {
    render() {
        return (
            <div id="results">
                <div className="user-details">
                    <div className="diet">
                        <RadioGroup
                            name="diet" withGap label="Diets" options={[
                            {label: 'Maintain Weight',value: 'op1'},
                            {label: 'Loose Weight',value: 'op2'},
                            {label: 'Gain Weight',value: 'op3'},
                            {label: 'High Protein',value: 'op4'},
                            {label: 'Low Carbs',value: 'op5'}]}>
                        </RadioGroup>
                        {/*<form action="#">
                            <p>
                                <label>
                                    <input name="group1" type="radio" checked/>
                                    <span>Red</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input name="group1" type="radio"/>
                                    <span>Yellow</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input className="with-gap" name="group1" type="radio"/>
                                    <span>Green</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input name="group1" type="radio" disabled="disabled"/>
                                    <span>Brown</span>
                                </label>
                            </p>
                        </form>*/}

                    </div>
                </div>
            </div>
        );
    }
}