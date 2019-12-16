import React from 'react';
import {Button,Icon} from 'react-materialize'

export default class FoodItem extends React.Component{
    //Function from article "robinwieruch.de/react-state-array-add-update-remove"
    onRemoveItem=i=>{
        this.setState();
    }

    render() {
        const obj=this.props.obj;
        return(
            <div className={"foodItem "+this.props.using} key={"foodItem"+ this.props.index}>
                <p key={"p"+ this.props.index} className="foodItemTitle gmd-1">{obj.label}
                    <Button className="foodItemDel"
                            flat icon={<Icon>close</Icon>}
                            onClick={this.props.onDel}
                            value={this.props.index}
                            key={"but"+ this.props.index}
                    />
                    <b className="foodItemQty" key={"b"+ this.props.index}>
                        ({obj.qty}g)
                    </b>
                </p>
            </div>
        );
    }
}