import React from 'react';

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
			console.log(temp);
			foodList.push(temp);
			console.log(foodList);
			return {foodList};
		})
		//e.target.appendChild(card);
		//this.setState({wow[0]=car});
		//this.state.wow[0]=car;
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
				<ul>
					<li>{this.state.foodList[0].label}</li>
					<li>{this.state.foodList[0].cal}</li>
					<li>{this.state.foodList[0].fat}</li>
					<li>{this.state.foodList[0].carbs}</li>
					<li>{this.state.foodList[0].pro}</li>
				</ul>
			</div>
		);
	}

}
