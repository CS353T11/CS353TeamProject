import React from 'react';
import FoodItem from "./FoodItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


export default class DragDropTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			foodList: [],
            foodReal: [],
			foodDel:{},
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
			},
			boxEmpty:true,
            boxChecked: false,
            boxEditing: false,
		};
		if(this.props.foodObjProp!==undefined && this.props.foodObjProp.length !==0){
			this.state.foodList=this.props.foodObjProp;
			/*console.log("One food item goes here...",this.state.foodList);*/
			this.state.boxEmpty=false;
		}
		this.targetDel=this.targetDel.bind(this);
        this.targetCross=this.targetCross.bind(this);
	}

	componentDidMount(){
		//only groups food when dropBox has food saved in it
		if(this.state.boxEmpty===false){
			this.groupFoodList();
		}
	}

	drop = async e => {
		e.preventDefault();
		const foodJSON = e.dataTransfer.getData('foodJSON');
		const foodObj = JSON.parse(foodJSON);

		await this.setState(prevState => {
			let foodList = prevState.foodList;
			let temp = {
				label: foodObj.label,
				foodId:foodObj.foodId,
				cal: foodObj.cal,
				fat: foodObj.fat,
				pro: foodObj.pro,
				carbs: foodObj.carbs,
				qty: foodObj.qty
			};
			//console.log(temp);
			foodList.push(temp);
			//console.log(foodList);
			return {foodList};
		})
		//e.target.appendChild(card);
		this.groupFoodList();
	};

	dragOver = e => {
		e.preventDefault();
	};

	onRemoveItem = i =>{
		console.log(i);
		this.setState(state=>{
			const foodList=state.foodList.filter((item,j) => i!==j);
			return {foodList};
		});
	};

	async targetDel(e){
		console.log("Deleted: "+e.currentTarget.value);
		let i=parseInt(e.currentTarget.value);
		await this.onRemoveItem(i);
		this.groupFoodList();
	};

	editBox(index,boxEditing) {
	    this.props.editBox(index,boxEditing);
        this.setState({boxEditing: !this.state.boxEditing});
    }

    async targetCross(e){
		let target=e.currentTarget;
		target=target.parentNode;
		target=target.parentNode;
        let tId=target.id;
        let arIndex=tId.split(':');
        //console.log(arIndex[2]);
        arIndex= parseInt(arIndex[2]);
		//console.log(this.state.foodList[arIndex[2]]);
        let food_id = this.props.index + ":" + parseInt(e.currentTarget.value);


		//sets the nutrition for the food item to zero and save it temporarily in an object
        for(let j=0; j<this.state.foodList.length; j++){

			if(this.state.foodList[j].cal!==0 && j===arIndex){
				//console.log("Zero'ing nutrients...");
				await this.setState(prevState => {
					let foodList = prevState.foodList;
					let foodDel=prevState.foodDel;
					foodDel[""+j]=JSON.parse(JSON.stringify(foodList[j]));
					foodList[j].cal=foodList[j].carbs=foodList[j].fat=foodList[j].pro=0;
					return {foodList,foodDel};
				})
                //console.log("Calories",this.state.foodList[j].cal);
            }else if(this.state.foodList[j].cal===0 && j===arIndex){
				//console.log("reverting nutrients...");
				await this.setState(prevState => {
					let foodList = prevState.foodList;
					let foodDel=prevState.foodDel;
					foodList[j]=JSON.parse(JSON.stringify(foodDel[""+j]));
					delete foodDel[""+j];
					return {foodList,foodDel};
				})
                //console.log("Calories",this.state.foodList[j].cal);
            }

        }

        //Recalculate Nutrients in foodlist
        this.groupFoodList();

        document.getElementById(food_id).classList.toggle("crossed");
    };

	async groupFoodList(){
		let totalNutr;
		if(this.state.foodList.length > 0) {
			//Groups the food by label
			let grpFood = this.state.foodList.reduce((acc, cv) => {
				//If its the first food with that label that we find, we create an space in the array for it
				if (!acc[cv.label]) {
					acc[cv.label] = {};
					acc[cv.label].label = cv.label;
					acc[cv.label].foodId= cv.foodId;
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
				let { label, foodId, cal, fat, pro, carbs, qty } = grpFood[key];
				return {
					label, foodId, cal,fat,pro,carbs,qty
				};
			});

			// console.log("!Group In Tile Dropped:");
			// console.log(grpFood);

			//Now we calculate total nutrition
			totalNutr = grpFood.reduce((a,b) => {
				return {
					cal: a.cal + b.cal,
					fat: a.fat + b.fat,
					pro: a.pro + b.pro,
					carbs: a.carbs + b.carbs,
				}
			});

			await this.setState({
				foodList: grpFood,
				totalNutr: totalNutr,
			})
			this.props.getTotalNutr(this.state.totalNutr, this.props.index);
			this.props.cacheTile(this.state.foodList,this.props.index);
		}
		else {
			totalNutr = {cal: 0, pro: 0, fat: 0, carbs: 0};
			await this.setState({
				foodList: [],
				totalNutr: totalNutr,
			})
			this.props.getTotalNutr(this.state.totalNutr, this.props.index);
			this.props.cacheTile(this.state.foodList,this.props.index);
		}
	}

	render() {
		return (
			<td className={"dropBox " +
            (this.state.boxChecked ? "checked" : "non-checked") + " " +
            (this.state.boxEditing ? "editing" : "non-editing")}
				id={this.props.index}
				onDrop={this.drop}
				onDragOver={this.dragOver}
			>
				{this.state.foodList[0]?
					this.state.foodList.map((obj,index) =>{
						/*console.log("rendering...",this.state.foodList);*/
						return(
							<FoodItem
								obj={obj}
								index={index}
								onDel={this.state.boxEditing ? this.targetCross : this.targetDel}
								id={this.props.index+":"+index}
                                key={this.props.index+":"+index}
								using={this.props.using}
							/>
						);
					})
					:
					<ul>
						<li className="placeholder"></li>
					</ul>
				}
				<div className="buttons">
                    <span className="edit" onClick={()=>
                        this.editBox(this.props.index, this.state.boxEditing)} >
                        <FontAwesomeIcon icon={faEdit} />
                    </span>
                    <span className="confirm" onClick={()=> {
                        //Whenever we click confirm, we change the state of the box "boxChecked" and add or sub the nutrition values
                        this.props.confirmBox(this.props.index, this.state.boxChecked);
                        this.setState({boxChecked: !this.state.boxChecked})
                    }}>
                        <FontAwesomeIcon icon={faCheckSquare} className="check"/>
                        <FontAwesomeIcon icon={faTimes} className="un-check"/>
                    </span>
                </div>
			</td>
		);
	};

}
