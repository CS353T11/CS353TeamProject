import React from 'react';
export default class DragDrop extends React.Component {

    checkMouse = (e) => {
        console.log("gotcha");
    }

    render() {
        return (
            <div className="dragDropTest">
                TEST
                <div className="dragBox" onMouseUp={this.checkMouse}>
                    DRAG HERE
                </div>
            </div>
        );
    }
}