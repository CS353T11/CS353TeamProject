import React from 'react'
import {Select} from 'react-materialize';
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
        diet: '',
        calories: '',
        carbs: '',
        fats: '',
        protein: '',
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({user})
                firebase.firestore().collection('profiles').doc(user.uid).get().then(doc => {
                    //console.log(doc.data())
                    this.setState((preState) => ({...preState.user, ...doc.data()}))
                    this.calcDiet();
                    //console.log(this.state)
                });
                //console.log(this.state)
            } else {
                this.props.history.push('/');
            }

        })
    }
}