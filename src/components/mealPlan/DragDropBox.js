import React from 'react';
import FoodItem from "./FoodItem";

export default class DragDropTest extends React.Component {
	constructor(props) {
		super(props);
		//TODO:Calculate nutrition for entire dropBox
		this.state = {
			foodList: [],
			foodListNutr:{
				cal: "",
				fat: "",
				pro: "",
				carbs: ""
			}
		};
		this.targetDel=this.targetDel.bind(this);
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

	onRemoveItem = i =>{
		this.setState(state=>{
			const foodList=state.foodList.filter((item,j) => i!==j);
			return {foodList};
		});
	};

	targetDel(e){
		console.log("WOW! it was you NUMBER "+e.currentTarget.value);
		let i=parseInt(e.currentTarget.value);
		this.onRemoveItem(i);
	};

	render() {
		return (
			<div className="dropBox"
				 id={this.props.id}
				 onDrop={this.drop}
				 onDragOver={this.dragOver}
			>
				{this.state.foodList[0]?
					this.state.foodList.map((obj,index) =>{
						return(
							<FoodItem
								obj={obj}
								index={index}
								onDel={this.targetDel}
							/>
						);
					})
					:
					<ul>
						<li>Empty</li>
					</ul>
				}
			</div>
		);
	};

}
