import React, { Component } from 'react';
class ToDoItem extends Component {

    render() {
        return (
            <div className="row" >
                <div className="col s12 m6">
                    <div className="card" style={this.getBackgroundColor(this.props.todo.status)}>
                        <div className="card-content">
                            <p>{this.props.todo.name}</p>
                        </div>
                    </div>
                </div>
            </div >
        )
    };
    getBackgroundColor = status => {
        switch (status) {
            case 'pending': return { backgroundColor: 'red' };
            case 'inprogress': return { backgroundColor: 'yellow' };
            case 'complete': return { backgroundColor: 'green' };
            default: return { backgroundColor: "transparent" };
        }
    }
}

export default ToDoItem;