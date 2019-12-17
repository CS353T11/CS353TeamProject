//import React from 'react';
import firebase from 'firebase';
import {db,mealPlan} from '../firebase/firebase';
export const mealPlanDayStructure={
    day:{
        "meal1":[{
            LABEL:"",
            FOOD_ID:"",
            CAL:0,
            CARBS:0,
            FAT:0,
            PRO:0
        }]
    }
}

export const mealPlanOBJTemplate={
    monday:{
        "meal1":[]
    },
    tuesday:{
        "meal1":[]
    },
    wednesday:{
        "meal1":[]
    },
    thursday:{
        "meal1":[]
    },
    friday:{
        "meal1":[]
    },
    saturday:{
        "meal1":[]
    },
    sunday:{
        "meal1":[]
    },
    rowcount:1
}

export function addMealPlanDoc(userID){
    mealPlan.doc(userID).set({
    userID:userID
    })
        .then(function() {
            //console.log("Collection added to Firestore!");
            let promises = [];
            //const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
            const timestamp=firebase.firestore.FieldValue.serverTimestamp();
            let actualMealPlanObj=JSON.parse(JSON.stringify(mealPlanOBJTemplate));
            Object.assign(actualMealPlanObj,{timestamp:timestamp});
            promises.push(mealPlan.doc(userID).collection('Actual').add(actualMealPlanObj));
            promises.push(mealPlan.doc(userID).collection('Template').doc('default').set(mealPlanOBJTemplate));
            Promise.all(promises).then(function() {
                console.log("All mealPlan subcollections were added!");
            })
                .catch(function(error){
                    console.log("Error adding subcollections to Firestore: " + error);
                });
        })
        .catch(function(error){
            console.log("Error adding document to Firestore: " + error);
        });
}

export function saveMealPlanTemplate(userID,cachedMeals){
    console.warn("Saving user "+userID+" 's meal plan template...");
    console.warn(cachedMeals);

    mealPlan.doc(userID).collection('Template').doc('default').set(cachedMeals);
}

export function deleteMealPlanTemplate(userID){
    console.warn("Deleting user "+userID+" 's meal plan template...");

    mealPlan.doc(userID).collection('Template').doc('default').set(mealPlanOBJTemplate);
}

export function removeRowMealPlanTemplate(userID,cachedMeals){
    console.warn("removing a row from user "+userID+" 's meal plan template...");
    console.warn(cachedMeals);

    //mealPlan.doc(userID).collection('Template').doc('default').set(cachedMeals);
}