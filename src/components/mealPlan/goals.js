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
        calories: '',
        carbs: '',
        fats: '',
        protein:'',
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
        let c = 0;
        let carb=0;
        let p=0;
        let f=0;
        if(e.target.value=="maintain"){
            this.setState({dietCalc:this.getCalculateResult()})
            c=this.getCalculateResult()
            carb = c*0.155;
            p=c*0.025;
            f=c*0.035;
        }
        else if(e.target.value=="loose"){
            this.setState({dietCalc:this.getCalculateResult()*.8})
            c=this.getCalculateResult()*0.8
            carb = c*0.155;
            p=c*0.025;
            f=c*0.035;
        }
        else if(e.target.value=="gain"){
            this.setState({dietCalc:this.getCalculateResult()*1.2})
            c=this.getCalculateResult()*1.2
            carb = c*0.155;
            p=c*0.025;
            f=c*0.035;

        }
        else if(e.target.value=="protein"){
            this.setState({dietCalc:this.getCalculateResult()*1.1})
            c=this.getCalculateResult()*1.1
            carb = c*0.13;
            p=c*0.075;
            f=c*0.035;
        }
        else if(e.target.value=="ketogenic"){
            this.setState({dietCalc:this.getCalculateResult()*0.9})
            c=this.getCalculateResult()*0.9
            carb = c*0.02;
            p=c*0.04;
            f=c*0.085;
        }
        console.log(c)
        this.setState({dietCalc:c})
        console.log(this.state.dietCalc)
        const userId = this.state.user.uid;
        const { calories, carbs, protein, fats} = this.state;
        //console.log(this.state)
        firebase.firestore().collection('profiles').doc(userId)
            .update({
                calories: Math.round(c),
                carbs:Math.round(carb),
                protein:Math.round(p),
                fats:Math.round(f),
            }).catch(error => {
            this.setState({ error })
        })
    }

    getCalculateResult(){
        if(this.state.gender=='Male')
            if(this.state.activityLevel=='Low'){
                let c= (66 + (6.3*( Number(this.state.weight) * 2.205)) + (12.9 * (Number(this.state.weight) / 2.54)) - (6.8 * Number(this.state.age)))*1.2;
                return Math.round(c);
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
                            <option value="loose">Loose Weight</option>
                            <option value="gain">Gain Weight</option>
                            <option value="protein">High Protein</option>
                            <option value="ketogenic">Ketogenic</option>
                        </Select>
                    </div>
                </div>
                <div className="plan">

                    <div>Your daily calorie intake: {this.state.dietCalc}</div>

                    <br/><br/><br/>
                    THIS IS THE CALCULATIONS FOR THE CALORIC INTAKE
                    <br/>
                    where for an average person consuming 2000 calories, 310g carbs, 50g of proteins and 70 g of fat is recommended
                    cal*0.155 = carbs
                    cal*0.025 = protein
                    cal*0.035 = fat


                </div>
            </div>
        );
    }
}