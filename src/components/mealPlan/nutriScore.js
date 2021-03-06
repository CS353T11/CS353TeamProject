import React from 'react'
import firebase from '../firebase/firebase';
export default class NutriScore extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            //all of this will be props
            planned_values: {
                kcal: '',
                prots: '',
                carbs: '',
                fats: '',
            },
            actual_values: {
                kcal: '',
                prots: '',
                carbs: '',
                fats: '',
            },
            nutriscore: {}
        }
    }

    async componentDidUpdate() {
        var kcal = (this.props.actual_values.kcal/this.props.planned_values.kcal)*100;
        var prots = (this.props.actual_values.prots/this.props.planned_values.prots)*100;
        var carbs = (this.props.actual_values.carbs/this.props.planned_values.carbs)*100;
        var fats = (this.props.actual_values.fats/this.props.planned_values.fats)*100;

        //console.log(kcal, prots,carbs,fats);

        document.getElementById("kcalbar").style.width= kcal + '%';
        document.getElementById("protsbar").style.width= prots + '%';
        document.getElementById("carbsbar").style.width= carbs + '%';
        document.getElementById("fatsbar").style.width= fats + '%';

        /*
        await this.setState({
            nutriscore: {
                kcal: kcal,
                prots: prots,
                carbs: carbs,
                fats: fats,
            },
        });
        */
    }

    //Rounds a number to only "exp" decimals :
    // https://stackoverflow.com/questions/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript
    round = (value, exp) => {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return 0;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    }

    render() {
        return (
            <div className="nutriscore">
                <h3 className="title">NutriScore</h3>
                <div className="nutribar-container">
                    <div className="nutribar">
                        <span className="bar" id="kcalbar"/>
                        <span className="counter">{this.round(this.props.actual_values.kcal,2)}
                        /{this.props.planned_values.kcal} kcal</span>
                    </div>
                    <div className="subtitle">Calories: </div>
                </div>
                <div className="nutribar-container">
                    <div className="nutribar">
                        <span className="bar" id="protsbar"/>
                        <span className="counter">{this.round(this.props.actual_values.prots,2)}
                        /{this.props.planned_values.prots} g</span>
                    </div>
                    <div className="subtitle">Protein: </div>
                </div>
                <div className="nutribar-container">
                    <div className="nutribar">
                        <span className="bar" id="carbsbar"/>
                        <span className="counter">{this.round(this.props.actual_values.carbs,2)}
                        /{this.props.planned_values.carbs} g</span>
                    </div>
                    <div className="subtitle">Carbs: </div>
                </div>
                <div className="nutribar-container">
                    <div className="nutribar">
                        <span className="bar" id="fatsbar"/>
                        <span className="counter">{this.round(this.props.actual_values.fats,2)}
                        /{this.props.planned_values.fats} g</span>
                    </div>
                    <div className="subtitle">Fats: </div>
                </div>
            </div>
        );
    }
}