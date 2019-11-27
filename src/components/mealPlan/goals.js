import React from 'react'
import Avatar from "../../images/avatar.svg";
export default class Goals extends React.Component {
    render() {
        return (
            <div id="results">
                <div className="user-details">
                    <div className="diet">
                        {/* <RadioGroup>
                            name="diet" withGap label="Diets" value="op1"
                            options={[{label: 'Maintain Weight',value: 'op1'},{label: 'Loose Weight',value: 'op2'},{label: 'Gain Weight',value: 'op3'},
                                {label: 'High Protein',value: 'op4'},{label: 'Low Carbs',value: 'op5'}]}
                        </RadioGroup>*/}
                        <form>

                            <div className="form-check">
                                <label>
                                    <input type="radio" name="dietChoice" value="option4" checked={true} className="form-check-input"/>
                                    High Protein
                                </label>
                            </div>

                            <div className="form-check">
                                <label>
                                    <input type="radio" name="dietChoice" value="option5" checked={true} className="form-check-input"/>
                                    Low Carbs
                                </label>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary mt-2" type="submit">
                                    Save
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}