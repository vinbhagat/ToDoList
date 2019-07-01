import React, { Component } from 'react';
import Axios from 'axios';
import { BE_URL } from '../../Config';
import ToDoItem from './ToDoItem';

class AllToDos extends Component {
    constructor(props) {
        super(props);
        this.state = { ToDoList: [] };
    }

    render() {
        return (
            <div>
                {this.state.ToDoList.map((ToDo, index) => {
                    return <ToDoItem key={`T${index}`} todo={ToDo} />
                })}
            </div>
        )
    }

    componentDidMount() {
        Axios.post(BE_URL).then(response => {
            this.setState({ ToDoList: response.data.payload });
        }).catch(error => console.log(error));
    }

}

export default AllToDos;