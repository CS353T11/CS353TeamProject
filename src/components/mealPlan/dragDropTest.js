import React from 'react';
export default class DragDrop extends React.Component {
    constructor(props){
        super(props);
        this.state={
            foodList:{
                label: '',
                cal:'',
                fat:'',
                pro:'',
                carbs:''
            }
        }
    }

    drop = e =>{
        e.preventDefault();
        const foodJSON=e.dataTransfer.getData('foodJSON');
        const foodObj=JSON.parse(foodJSON);

        console.log(foodObj);
        this.setState(prevState =>{
            let foodList=Object.assign({}, prevState.foodList);
            foodList.label=foodObj.label;
            foodList.cal=foodObj.cal;
            foodList.pro=foodObj.pro;
            foodList.fat=foodObj.fat;
            foodList.carbs=foodObj.carbs;
            return {foodList};
        })
        //e.target.appendChild(card);
        //this.setState({wow[0]=car});
        //this.state.wow[0]=car;
    }

    dragOver = e =>{
        e.preventDefault();
    }

    render(){
        return (
            <div className={this.props.className}
                 id={this.props.id}
                 onDrop={this.drop}
                 onDragOver={this.dragOver}
            >
                <ul>
                    <li>{this.state.foodList.label}</li>
                    <li>{this.state.foodList.cal}</li>
                    <li>{this.state.foodList.fat}</li>
                    <li>{this.state.foodList.carbs}</li>
                    <li>{this.state.foodList.pro}</li>
                </ul>
            </div>
        );
    }

}
