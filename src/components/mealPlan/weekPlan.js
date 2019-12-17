import React from 'react'


export default class WeekPlan extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.isTypeActual !== prevProps.isTypeActual) {
    //         console.log("we be updating bruv");
    //         if(this.props.isTypeActual===true){
    //             console.log("it be TRUEEEE");
    //         }else{
    //             console.log("ru ro raggy");
    //         }
    //     }
    // }

    render(){
        return (
            <div>
                <div>
                    <table className={"mealplan " + this.props.using}>
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
                            {this.props.rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}