import React from 'react'

export default class FoodItem extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const obj=this.props.obj;
        return(
            <div className="foodItem">
                <h3 className="foodItemTitle gmd-1">{obj.label}</h3>
            </div>
        );
    }
}