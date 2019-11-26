import React from 'react'
export default class NutriScore extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //all of this will be props
            planned_values: {
                kcal: 2000,
                prots: 40,
                carbs: 250,
                fats: 100,
            },
            actual_values: {
                kcal: 1800,
                prots: 38,
                carbs: 200,
                fats: 150,
            },
        }
    }

    async componentDidMount() {
        var kcal = (this.state.actual_values.kcal/this.state.planned_values.kcal)*100;
        var prots = (this.state.actual_values.prots/this.state.planned_values.prots)*100;
        var carbs = (this.state.actual_values.carbs/this.state.planned_values.carbs)*100;
        var fats = (this.state.actual_values.fats/this.state.planned_values.fats)*100;
        console.log(kcal);
        await this.setState({nutriscore:
        {
            kcal: kcal,
            prots: prots,
            carbs: carbs,
            fats: fats,
        },
        });
        document.getElementById("kcalbar").style.width= kcal + '%';
        document.getElementById("protsbar").style.width= prots + '%';
        document.getElementById("carbsbar").style.width= carbs + '%';
        document.getElementById("fatsbar").style.width= fats + '%';
    }

    render() {
        return (
            <div className="nutriscore">
                <h3 className="title">NutriScore</h3>
                <div className="nutribar-container">
                    <div className="nutribar">
                        <span className="bar" id="kcalbar"/>
                        <span className="counter">{this.state.actual_values.kcal}/{this.state.planned_values.kcal}</span>
                    </div>
                    <div className="subtitle">Calories: </div>
                </div>
                <div className="nutribar-container">
                    <div className="nutribar">
                        <span className="bar" id="protsbar"/>
                        <span className="counter">{this.state.actual_values.prots}/{this.state.planned_values.prots}</span>
                    </div>
                    <div className="subtitle">Prots: </div>
                </div>
                <div className="nutribar-container">
                    <div className="nutribar">
                        <span className="bar" id="carbsbar"/>
                        <span className="counter">{this.state.actual_values.carbs}/{this.state.planned_values.carbs}</span>
                    </div>
                    <div className="subtitle">Carbs: </div>
                </div>
                <div className="nutribar-container">
                    <div className="nutribar">
                        <span className="bar" id="fatsbar"/>
                        <span className="counter">{this.state.actual_values.fats}/{this.state.planned_values.fats}</span>
                    </div>
                    <div className="subtitle">Fats: </div>
                </div>
            </div>
        );
    }
}