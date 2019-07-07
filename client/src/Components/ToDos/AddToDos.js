import React, { Component } from 'react';

import Axios from 'axios';
import { BE_URL } from '../../Config';
import M from 'materialize-css';

class AddToDos extends Component {
    render() {
        return (
            <div className="row" style={{ marginTop: "5em" }}>
                <div className="row">
                    <form className="col s6 m6" id='AddTodoForm'>
                        <div className="input-field col s6">
                            <input placeholder="Enter Todo Name" id="todo_name" type="text" className="validate" />
                            <label htmlFor="todo_name">ToDo Name</label>
                        </div>
                        <div className="input-field col s6 m6">
                            <select id='status' defaultValue="">
                                <option value="" disabled>Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="inprogress">In-progress</option>
                                <option value="complete">Complete</option>
                            </select>
                            <label>Status</label>
                        </div>
                    </form>
                    <div className="center-align col left s4">
                        <button className="btn waves-light" onClick={this.onFormSubmit} style={{ marginRight: "2em" }} id="add">Add</button>
                        <button className="btn grey waves-light" onClick={this.resetForm} id="clear">Clear</button>
                    </div>
                </div>
            </div>
        )
    }

    onFormSubmit = () => {
        let formElems = document.getElementById('AddTodoForm').elements;
        let todoName = formElems["todo_name"].value;
        let status = formElems["status"].value;
        let id = formElems["todoId"];
        console.log(todoName);
        console.log(status);
        if (this.isInputValid(todoName, status)) {
            Axios.post(`${BE_URL}add`, { name: todoName, status, id }).then(response => {
                console.log(response);
                this.props.setToDos(response.data.payload);
                M.toast({ html: "ToDo added successfully.", classes: 'success' });
            }).catch(err => {
                console.log(err);
                M.toast({ html: "Error occurred", classes: 'error' });
            })
        }
    }

    isInputValid = (name, status) => {
        if (name.length === 0) {
            M.toast({ html: 'Enter valid Todo name.', classes: 'error' });
            return;
        }
        if (status.length === 0) {
            M.toast({ html: 'Enter valid Todo status.', classes: 'error' });
            return;
        }
        return true;
    }

    resetForm = () => {
        // document.getElementById('add').innerHTML = "Add";
        let formElems = document.getElementById('AddTodoForm').elements;
        document.getElementById('add').innerHTML = "Add";
        formElems.todo_name.value = "";
        formElems.status.value = "";
        formElems.todoId = "";
    }
}

export default AddToDos;