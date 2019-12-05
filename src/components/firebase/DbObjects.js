import React from 'react';
import firebase from '../firebase/firebase';
import {db,mealPlan} from '../firebase/firebase';
export const mealPlanOBJ={
    monday:{
        "meal1":[{
            CAL:0,
            CARBS:0,
            FAT:0,
            PRO:0
        }]
    },
    tuesday:{
        "meal1":[{
            CAL:0,
            CARBS:0,
            FAT:0,
            PRO:0
        }]
    },
    wednesday:{
        "meal1":[{
            CAL:0,
            CARBS:0,
            FAT:0,
            PRO:0
        }]
    },
    thursday:{
        "meal1":[{
            CAL:0,
            CARBS:0,
            FAT:0,
            PRO:0
        }]
    },
    friday:{
        "meal1":[{
            CAL:0,
            CARBS:0,
            FAT:0,
            PRO:0
        }]
    },
    saturday:{
        "meal1":[{
            CAL:0,
            CARBS:0,
            FAT:0,
            PRO:0
        }]
    },
    sunday:{
        "meal1":[{
            CAL:0,
            CARBS:0,
            FAT:0,
            PRO:0
        }]
    }
}

export function addMealPlanDoc(userID,numOfMeals){
    mealPlan.doc(userID).set({
    userID:userID
    })
        .then(function() {
            console.log("Collection added to Firestore!");
            let promises = [];
            const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
            let actualMealPlanObj=mealPlanOBJ;
            Object.assign(actualMealPlanObj,{timestamp:timestamp});
            promises.push(mealPlan.doc(userID).collection('Actual').add(actualMealPlanObj));
            promises.push(mealPlan.doc(userID).collection('Template').doc('default').set(mealPlanOBJ));
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