import React from 'react'
import Avatar from "../../images/avatar.svg";
import {RadioGroup, Select} from 'react-materialize';
import firebase from '../firebase/firebase';
export default class Goals extends React.Component {
    state = {
        user: null,
        name: '',
        age: '',
        gender: null,
        height: '',
        weight: '',
        activityLevel: '',
        error: '',
        dietCalc:'',
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user })
                let profileRef = firebase.firestore().collection('profiles').doc(user.uid).get().then(doc => {
                    //console.log(doc.data())
                    this.setState((preState) => ({ ...preState.user, ...doc.data() })
                    )
                    //console.log(this.state)
                });
                //console.log(this.state)
            } else {
                this.props.history.push('/');
            }

        })
    }

    handleChange = (e) => {
        if(e.target.value=="maintain"){
            this.setState({dietCalc: this.getCalculateResult()})

        }
        else if(e.target.value=="lose"){
            this.setState({dietCalc: this.getCalculateResult()*.8})
        }
        else if(e.target.value=="gain"){
            this.setState({dietCalc: this.getCalculateResult()*1.2})
        }
        else if(e.target.value=="protein"){
            this.setState({dietCalc: this.getCalculateResult()*1.1})
        }
        else if(e.target.value=="keto"){
            this.setState({dietCalc: this.getCalculateResult()})
        }
    }

    getCalculateResult(){
        if(this.state.gender=='Male')
            if(this.state.activityLevel=='Low'){
                let cal= (66 + (6.3*( Number(this.state.weight) * 2.205)) + (12.9 * (Number(this.state.weight) / 2.54)) - (6.8 * Number(this.state.age)))*1.2;
                let carb = 310;
                let protein = 50;
                let fats = 70;
                return cal +"\n Carbs: "+ carb+"\n Fats: "+fats+"\n Protein: " +protein;


            }
            else if(this.state.activityLevel=='Moderate'){
                let cal= (66 + (6.3*( Number(this.state.weight) * 2.205)) + (12.9 * (Number(this.state.weight) / 2.54)) - (6.8 * Number(this.state.age)))*1.55;
                return cal;
            }
            else {
                let cal= (66 + (6.3*( Number(this.state.weight) * 2.205)) + (12.9 * (Number(this.state.weight) / 2.54)) - (6.8 * Number(this.state.age)))*1.9;
                return cal;
            }

        else
        if(this.state.activityLevel=='Low') {
            let cal = (665 + (4.3 * (Number(this.state.weight) * 2.205)) + (4.7 * (Number(this.state.weight) / 2.54)) - (4.7 * Number(this.state.age))) * 1.2;
            return cal;
        }
        else if(this.state.activityLevel=='Moderate'){
            let cal = (665 + (4.3 * (Number(this.state.weight) * 2.205)) + (4.7 * (Number(this.state.weight) / 2.54)) - (4.7 * Number(this.state.age))) * 1.55;
            return cal;
        }
        else {
            let cal = (665 + (4.3 * (Number(this.state.weight) * 2.205)) + (4.7 * (Number(this.state.weight) / 2.54)) - (4.7 * Number(this.state.age))) * 1.9;
            return cal;
        }
    }


    render() {
        return (
            <div className="results">
                <div className="user-details">
                    <div className="diet">
                    <br/>
                        <Select id="dietCalc"
                            onChange={this.handleChange}
                            options={{
                                classes: '',
                                dropdownOptions: {alignment: 'left', autoTrigger: true, closeOnClick: true, constrainWidth: true, container: null, coverTrigger: true, hover: false, inDuration: 150, onCloseEnd: null, onCloseStart: null, onOpenEnd: null, onOpenStart: null, outDuration: 250}
                            }} value="">
                            <option disabled value="">Diet Plan</option>
                            <option value="maintain">Maintain Weight</option>
                            <option value="lose">Lose Weight</option>
                            <option value="gain">Gain Weight</option>
                            <option value="protein">High Protein</option>
                            <option value="keto">Ketogenic</option>
                        </Select>
                    </div>
                </div>++++++
                <div className="plan">

                    <div>Your daily calorie intake: {this.state.dietCalc}</div>

                    <br/><br/><br/>
                    THIS IS THE CALCULATIONS FOR THE CALORIC INTAKE

                    if male: x=(66 + (6.3x( weightkg x 2.205)) + (12.9 x (heightcm / 2.54)) - (6.8 x age))
                    if female x=(665 +(4.3 x ( weightkg x 2.205)) + (4.7 X (heightcm / 2.54)) - (4.7 x age))

                    light activity = x * 1.2
                    moderate activity = x *1.55
                    high activity = x*1.9

                    calorie to gram conversion,
                    int grams = x/7.72

                    then we use the percentages for carbs fats and proteins against this value to find the weight of them that are needed
                </div>
            </div>
        );
    }
}