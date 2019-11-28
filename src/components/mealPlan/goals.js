import React from 'react'
import Avatar from "../../images/avatar.svg";
import {RadioGroup, Select} from 'react-materialize';
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
                            <option
                                disabled
                                value=""
                            >
                                Diet Plan
                            </option>
                            <option value="maintain">
                                Maintain Weight
                            </option>
                            <option value="loose">
                                Loose Weight
                            </option>
                            <option value="gain">
                                Gain Weight
                            </option>
                            <option value="protein">
                                High Protein
                            </option>
                        </Select>
                    </div>
                </div>
                <div className="maintain">
                    if male: (66 + (6.3x( weightkg x 2.205)) + (12.9 x (heightcm / 2.54)) - (6.8 x age))
                    if female (665 +(4.3 x ( weightkg x 2.205)) + (4.7 X (heightcm / 2.54)) - (4.7 x age))

                </div>
            </div>
        );
    }
}