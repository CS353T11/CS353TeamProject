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
        diet:'',
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
        let diet="";
        this.setState({
            [e.target.id]: e.target.value
        })
        if(e.target.value==="Maintain weight"){
            this.setState({dietCalc:this.getCalculateResult()});
            c=this.getCalculateResult();
            carb = c*0.155;
            p=c*0.025;
            f=c*0.035;
            diet = e.target.value;
        }
        else if(e.target.value==="Lose weight"){
            this.setState({dietCalc:this.getCalculateResult()*.8});
            c=this.getCalculateResult()*0.8;
            carb = c*0.155;
            p=c*0.025;
            f=c*0.035;
            diet = e.target.value;
        }
        else if(e.target.value==="Gain weight"){
            this.setState({dietCalc:this.getCalculateResult()*1.2});
            c=this.getCalculateResult()*1.2;
            carb = c*0.155;
            p=c*0.025;
            f=c*0.035;
            diet = e.target.value;
        }
        else if(e.target.value==="High Protein diet"){
            this.setState({dietCalc:this.getCalculateResult()*1.1});
            c=this.getCalculateResult()*1.1;
            carb = c*0.13;
            p=c*0.075;
            f=c*0.035;
            diet = e.target.value;
        }
        else if(e.target.value==="Ketogenic diet"){
            this.setState({dietCalc:this.getCalculateResult()*0.9});
            c=this.getCalculateResult()*0.9;
            carb = c*0.02;
            p=c*0.04;
            f=c*0.085;
            diet = e.target.value;
        }
        console.log(c);
        this.setState({dietCalc:c});
        console.log(this.state.dietCalc);
        const userId = this.state.user.uid;
        const { calories, carbs, protein, fats} = this.state;
        //console.log(this.state)
        firebase.firestore().collection('profiles').doc(userId)
            .update({
                diet: diet,
                calories: Math.round(c),
                carbs:Math.round(carb),
                protein:Math.round(p),
                fats:Math.round(f),
            }).catch(error => {
            this.setState({ error })
        })
        let profileRef = firebase.firestore().collection('profiles').doc(userId).get().then(doc => {
            //console.log(doc.data())
            this.setState((preState) => ({ ...preState.user, ...doc.data() })
            )
            //console.log(this.state)
        });
    }

    getCalculateResult(){
        if(this.state.gender==='Male')
            if(this.state.activityLevel==='Low'){
                let c= (66 + (6.3*( Number(this.state.weight) * 2.205)) + (12.9 * (Number(this.state.height) / 2.54)) - (6.8 * Number(this.state.age)))*1.2;
                return Math.round(c);
            }
            else if(this.state.activityLevel==='Moderate'){
                let cal= (66 + (6.3*( Number(this.state.weight) * 2.205)) + (12.9 * (Number(this.state.height) / 2.54)) - (6.8 * Number(this.state.age)))*1.55;
                return cal;
            }
            else {
                let cal= (66 + (6.3*( Number(this.state.weight) * 2.205)) + (12.9 * (Number(this.state.height) / 2.54)) - (6.8 * Number(this.state.age)))*1.9;
                return cal;
            }

        else
        if(this.state.activityLevel==='Low') {
            let cal = (665 + (4.3 * (Number(this.state.weight) * 2.205)) + (4.7 * (Number(this.state.height) / 2.54)) - (4.7 * Number(this.state.age))) * 1.2;
            return cal;
        }
        else if(this.state.activityLevel==='Moderate'){
            let cal = (665 + (4.3 * (Number(this.state.weight) * 2.205)) + (4.7 * (Number(this.state.height) / 2.54)) - (4.7 * Number(this.state.age))) * 1.55;
            return cal;
        }
        else {
            let cal = (665 + (4.3 * (Number(this.state.weight) * 2.205)) + (4.7 * (Number(this.state.height) / 2.54)) - (4.7 * Number(this.state.age))) * 1.9;
            return cal;
        }
    }

    render() {
        const { diet, calories, carbs, protein, fats} = this.state;
        return (
                <div className="profile-details goals">
                    <h3 className="title">Nutrition</h3>
                    <div className="table">
                            <div className="cell input">
                                <Select id="dietCalc"
                                        onChange={this.handleChange}
                                    //window.location.reload();
                                        options={{
                                            classes: '',
                                            dropdownOptions: {alignment: 'left', autoTrigger: true, closeOnClick: true, constrainWidth: true, container: null, coverTrigger: true, hover: false, inDuration: 150, onCloseEnd: null, onCloseStart: null, onOpenEnd: null, onOpenStart: null, outDuration: 250}
                                        }} value="">
                                    <option disabled value="">Diet Plan</option>
                                    <option value="Maintain weight"  onChange={this.handleChange}>Maintain Weight</option>
                                    <option value="Lose weight"  onChange={this.handleChange}>Lose Weight</option>
                                    <option value="Gain weight"  onChange={this.handleChange}>Gain Weight</option>
                                    <option value="High Protein diet"  onChange={this.handleChange}>High Protein</option>
                                    <option value="Ketogenic diet"  onChange={this.handleChange}>Ketogenic</option>
                                </Select>
                            </div>
                        <div className="row">
                            <div className="cell bold">Diet:</div>
                            <div className="cell"  onChange={this.handleChange}>{diet}</div>
                        </div>
                        <div className="row">
                            <div className="cell bold">Calories:</div>
                            <div className="cell"  onChange={this.handleChange}>{calories} kcal</div>
                        </div>
                        <div className="row">
                            <div className="cell bold">Carbs:</div>
                            <div className="cell"  onChange={this.handleChange}>{carbs} g</div>
                        </div>
                        <div className="row">
                            <div className="cell bold">Protein:</div>
                            <div className="cell"  onChange={this.handleChange}>{protein} g</div>
                        </div>
                        <div className="row">
                            <div className="cell bold">Fats:</div>
                            <div className="cell"  onChange={this.handleChange}>{fats} g</div>
                        </div>
                    </div>
            </div>
        );
    }
}