import React from 'react'
export default class WeekPlan extends React.Component{
    render() {
        return (
            <table className="mealplan">
                <tr className="plan-header">
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                </tr>
                <tr>
                    <td>
                        <div className="plan-item active">API ITEM</div>
                        <div className="plan-item active">API ITEM</div>
                        <div className="plan-item active">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="plan-item">API ITEM</div>
                        <div className="plan-item">API ITEM</div>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="plan-item">API ITEM</div>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                    <td>
                        <div className="plan-item">API ITEM</div>
                    </td>
                </tr>
            </table>
        );
    }
}