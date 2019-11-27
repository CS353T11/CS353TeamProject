import React from 'react'
export default class CreatePlanTest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            rows: []
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

    render() {
        return (
            <div>
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
                    <div>
                        <button className="btn-login" onClick={this.addRow}>ADD</button>
                    </div>
                </div>
            </div>
        );
    }
}