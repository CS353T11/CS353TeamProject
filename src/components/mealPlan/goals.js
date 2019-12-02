import React from 'react'
import Avatar from "../../images/avatar.svg";
import {RadioGroup, Select} from 'react-materialize';
import firebase from '../firebase/firebase';
export default class Goals extends React.Component {
    render() {
        return (
            <div id="results">
                <div className="user-details">
                    <div className="diet">
                    <br/>
                        <Select
                            onChange={function noRefCheck(){}}
                            options={{
                                classes: '',
                                dropdownOptions: {alignment: 'left', autoTrigger: true, closeOnClick: true, constrainWidth: true, container: null, coverTrigger: true, hover: false, inDuration: 150, onCloseEnd: null, onCloseStart: null, onOpenEnd: null, onOpenStart: null, outDuration: 250}
                            }} value="">
                            <option disabled value="">Diet Plan</option>
                            <option value="maintain">Maintain Weight</option>
                            <option value="loose">Loose Weight</option>
                            <option value="gain">Gain Weight</option>
                            <option value="protein">High Protein</option>
                            <option value="keto">Ketogenic</option>
                        </Select>
                    </div>
                </div>
                <div className="plan">
                    THIS IS THE CALCULATIONS FOR THE CALORIC INTAKE
                    if male: x=(66 + (6.3x( weightkg x 2.205)) + (12.9 x (heightcm / 2.54)) - (6.8 x age))
                    if female x=(665 +(4.3 x ( weightkg x 2.205)) + (4.7 X (heightcm / 2.54)) - (4.7 x age))

                    light activity = x * 1.2
                    moderate activity = x *1.55
                    high activity = x*1.9
                    <div className="maintain">
                        <br/>
                        Maintain weight:
                        your daily caloric intake = x;
                        50% carbs
                        30% protein
                        20% fat
                    </div>
                    <div className="loose">
                        <br/>
                        Loose weight:
                        your daily caloric intake = x*.75;
                        50% carbs
                        30% protein
                        20% fat
                    </div>
                    <div className="gain">
                        <br/>
                        Gain weight:
                        your daily caloric intake = x*1.25;
                        50% carbs
                        30% protein
                        20% fat
                    </div>
                    <div className="protein">
                        <br/>
                        High Protein:
                        your daily caloric intake = x*1.10;
                        40% carbs
                        40% protein
                        20% fat
                    </div>
                    <div className="keto">
                        <br/>
                        Ketogenic:
                        your daily caloric intake = x;
                        20% carbs
                        35% protein
                        55% fat
                    </div>
                </div>
            </div>
        );
    }
}