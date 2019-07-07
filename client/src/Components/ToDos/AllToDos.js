import React, { Component } from 'react';

import ToDoItem from './ToDoItem';
import Axios from 'axios';
import { BE_URL } from '../../Config';

class AllToDos extends Component {
    render() {
        return (
            <div>
                {this.props.ToDoList.flatMap((ToDo, index) => {
                    let todoItem = <ToDoItem key={`T${index}`} todo={ToDo} deleteToDo={this.deleteToDo} editToDo={this.editToDo} />;
                    return this.props.filter === '' ? todoItem : this.props.filter === ToDo.status ? todoItem : [];
                })}
            </div>
        )
    };

    deleteToDo = todoId => {
        Axios.delete(BE_URL, { data: { id: todoId, status: this.props.status } }).then(response => {
            // this.setState({ ToDoList: response.data.payload });
            console.log(response);
            this.props.setToDos(response.data.payload);
        }).catch(error => console.log(error));
    };

    editToDo = todo => {
        let formElems = document.getElementById('AddTodoForm').elements;
        document.getElementById('add').innerHTML = "Edit";
        formElems.todo_name.value = todo.name;
        formElems.status.value = todo.status;
        formElems.todoId = todo._id;
        console.log(todo.status);
    }
}

export default AllToDos;