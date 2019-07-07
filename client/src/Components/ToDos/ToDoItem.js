import React, { Component } from 'react';
import './ToDoItem.css';
class ToDoItem extends Component {

    render() {
        return (
            <div className="row" >
                <div className="col s12 m6">
                    <div className="card" style={this.getBackgroundColor(this.props.todo.status)}>
                        <div className="card-content">
                            <div>
                                <p>{this.props.todo.name}</p>
                                <span className="right operation-icons">
                                    <i onClick={this.editToDo} style={{ marginRight: "1em" }} className="material-icons center-align">edit</i>
                                    <i onClick={this.deleteToDo} className="material-icons center-align">close</i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
    getBackgroundColor = status => {
        switch (status) {
            case 'pending': return { backgroundColor: 'red' };
            case 'inprogress': return { backgroundColor: 'yellow' };
            case 'complete': return { backgroundColor: 'green' };
            default: return { backgroundColor: "transparent" };
        }
    };
    deleteToDo = () => {
        this.props.deleteToDo(this.props.todo._id);
    };
    editToDo = () => {
        this.props.editToDo(this.props.todo);
    };
}

export default ToDoItem;