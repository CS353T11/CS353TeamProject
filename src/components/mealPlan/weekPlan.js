import React from 'react'
export default class WeekPlan extends React.Component{
    render() {
        return (
            <table className="plan">
                <tr>
                    <th>Meal</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>

                </tr>
                <tr>
                    <th>Meal 1</th>
                </tr>
                <tr>
                    <th>Meal 2</th>
                </tr>
                <tr>
                    <th>Meal 3</th>
                </tr>
            </table>
        );
    }
}