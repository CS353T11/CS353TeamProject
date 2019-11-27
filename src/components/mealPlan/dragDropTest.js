import React from 'react';
import FoodItem from "./FoodItem";

export default class DragDrop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			foodList: []
		}
	}

	drop = e => {
		e.preventDefault();
		const foodJSON = e.dataTransfer.getData('foodJSON');
		const foodObj = JSON.parse(foodJSON);

		this.setState(prevState => {
			let foodList = prevState.foodList;
			let temp = {
				label: foodObj.label,
				cal: foodObj.cal,
				fat: foodObj.fat,
				pro: foodObj.pro,
				carbs: foodObj.carbs
			};
			//console.log(temp);
			foodList.push(temp);
			console.log(foodList);
			return {foodList};
		})
		//e.target.appendChild(card);
	};

	dragOver = e => {
		e.preventDefault();
	};

	render() {
		return (
			<div className={this.props.className}
				 id={this.props.id}
				 onDrop={this.drop}
				 onDragOver={this.dragOver}
			>
                {this.state.foodList[0]?
                    this.state.foodList.map((obj,index) =>{
                        return(
                            <FoodItem obj={obj}/>
                        );
                    })
                    :
                    <ul>
                        <li>Nothing to show here</li>
                    </ul>
                }
			</div>
		);
	}

}
