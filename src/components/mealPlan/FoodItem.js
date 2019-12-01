import React from 'react';
import {Button,Icon} from 'react-materialize'

export default class FoodItem extends React.Component{
    constructor(props){
        super(props);
    }

    //Function from article "robinwieruch.de/react-state-array-add-update-remove"
    onRemoveItem=i=>{
        this.setState();
    }

    render() {
        const obj=this.props.obj;
        return(
            <div className="foodItem" key={"foodItem"+ this.props.index}>
                <p className="foodItemTitle gmd-1">{obj.label}
                <Button className="foodItemDel"
                        flat icon={<Icon>close</Icon>}
                        onClick={this.props.onDel}
                        value={this.props.index}
                />
                <b className="foodItemQty">
                    ({obj.qty}g)
                </b>
                </p>
            </div>
        );
    }
}