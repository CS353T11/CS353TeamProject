import React from 'react';
import FoodItem from "./FoodItem";

export default class DragDropTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			foodList: [],
			totalNutr: {
				cal: "",
				fat: "",
				pro: "",
				carbs: "",
			},
			foodListNutr:{
				cal: "",
				fat: "",
				pro: "",
				carbs: "",
				qty: 0
			}
		};
		this.targetDel=this.targetDel.bind(this);
	}

	drop = async e => {
		e.preventDefault();
		const foodJSON = e.dataTransfer.getData('foodJSON');
		const foodObj = JSON.parse(foodJSON);

		await this.setState(prevState => {
			let foodList = prevState.foodList;
			let temp = {
				label: foodObj.label,
				cal: foodObj.cal,
				fat: foodObj.fat,
				pro: foodObj.pro,
				carbs: foodObj.carbs,
				qty: foodObj.qty
			};
			//console.log(temp);
			foodList.push(temp);
			console.log(foodList);
			return {foodList};
		})
		//e.target.appendChild(card);
		this.groupFoodList();
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

	async targetDel(e){
		console.log("WOW! it was you NUMBER "+e.currentTarget.value);
		let i=parseInt(e.currentTarget.value);
		await this.onRemoveItem(i);
		this.groupFoodList();
	};

	groupFoodList(){
		let totalNutr;
		if(this.state.foodList.length > 0) {
			//Groups the food by label
			let grpFood = this.state.foodList.reduce((acc, cv) => {
				//If its the first food with that labl that we find, we create an space in the array for it
				if (!acc[cv.label]) {
					acc[cv.label] = {};
					acc[cv.label].label = cv.label;
					acc[cv.label].cal = acc[cv.label].fat = acc[cv.label].pro = acc[cv.label].carbs = acc[cv.label].qty = 0;
				}
				//We add up the nutrients of the same label
				acc[cv.label].cal += cv.cal;
				acc[cv.label].fat += cv.fat;
				acc[cv.label].pro += cv.pro;
				acc[cv.label].carbs += cv.carbs;
				acc[cv.label].qty += (+cv.qty);
				return acc;
			}, {});

			//This is an object of objects now with all of them grouped by name

			//Now we transform it to an array again
			grpFood = Object.keys(grpFood).map(key => {
				let { label, cal, fat, pro, carbs, qty } = grpFood[key];
				return {
					label,cal,fat,pro,carbs,qty
				};
			});

			console.log("Grouped:");
			console.log(grpFood);

			//Now we calculate total nutrition
			totalNutr = grpFood.reduce((a,b) => {
				return {
					cal: a.cal + b.cal,
					fat: a.fat + b.fat,
					pro: a.pro + b.pro,
					carbs: a.carbs + b.carbs,
				}
			});

			console.log("Total:");
			console.log(totalNutr);

			this.setState({
				foodList: grpFood,
				totalNutr: totalNutr,
			})
		}
		else {
			totalNutr = {cal: 0, pro: 0, fat: 0, carbs: 0};
			this.setState({
				foodList: [],
				totalNutr: totalNutr,
			})
		}
		console.log(this.props);
		this.props.getTotalNutr(totalNutr, this.props.index);
	}

	render() {
		return (
			<td className="dropBox"
				 id={this.props.id}
				 onDrop={this.drop}
				 onDragOver={this.dragOver}
			>
				{this.state.foodList[0]?
					this.state.foodList.map((obj,index) =>{
						console.log(this.state.foodList);
						return(
							<FoodItem
								obj={obj}
								index={index}
								onDel={this.targetDel}
								key={this.props.index+"food"+index}
							/>
						);
					})
					:
					<ul>
						<li >Empty</li>
					</ul>
				}
			</td>
		);
	};

}
