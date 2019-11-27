import React from 'react';
export default class DragDrop extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list: [1, 2, 3],
            foodList:{
                name: 'jasper',
                age: 28
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
            foodList.name=foodObj.label;
            return foodList
        })
        console.log(this.state.foodList);
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
                    {this.state.list.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }

}
