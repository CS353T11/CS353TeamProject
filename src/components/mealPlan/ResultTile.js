import React from 'react';

export default class ResultTile extends React.Component{
    dragStart = e =>{
        const foodObj={
            label:this.props.label,
            cal:this.props.Cal,
            fat:this.props.Fat,
            pro:this.props.Pro,
            carbs:this.props.carbs
        };
        var foodJSON=JSON.stringify(foodObj)

        //NOTE: .setData takes a string argument for data to be passed, hence the JSON.stringify
        e.dataTransfer.setData('foodJSON',foodJSON);

        // setTimeout(() =>{
        //     target.style.display="none";
        // },0)
    }

    dragOver = e =>{
        e.stopPropagation();
    }

    render() {
        return(
            <div className="api-item"
                 key={this.props.id}
                 id={this.props.id}
                 draggable={this.props.draggable}
                 onDragStart={this.dragStart}
                 onDragOver={this.dragOver}
            >
                <h3 className="food-title">{this.props.label}</h3>
                <div className="food-info" id={"foodNutr"+this.props.index}>
                    <p className="info-line"><b className="nutrient-name">Calories</b>{this.props.Cal}kcal</p>
                    <p className="info-line"><b className="nutrient-name">Fat</b>{this.props.Fat}g</p>
                    <p className="info-line"><b className="nutrient-name">Carbs</b>{this.props.Carbs}g</p>
                    <p className="info-line"><b className="nutrient-name">Protein</b>{this.props.Pro}g</p>
                </div>
            </div>
        )
    }

}

