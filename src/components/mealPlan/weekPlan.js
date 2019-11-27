import React from 'react'
import DragDropBox from "./DragDropBox";
export default class WeekPlan extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: [
                <tr>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                    <td>
                        <DragDropBox/>
                    </td>
                </tr>
            ]
        };

        this.addRow = this.addRow.bind(this);
    }

    addRow() {
        var joined = this.state.rows.concat(
            <tr>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
            </tr>
        );
        this.setState({ rows: joined })
    }

    render(){
        return (
            <div>
                <div className="btn-group">
                    <button className="btn-login" onClick={this.addRow}>ADD</button>
                    <button className="btn-login" onClick={this.addRow}>REMOVE</button>
                </div>
                <div>
                    <table className="mealplan">
                        <thead>
                        <tr className="plan-header">
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.rows}
                        </tbody>
                    </table>
                </div>
            </div>
            /*<div className="plan-item">API ITEM</div>*/
        );
    }
}