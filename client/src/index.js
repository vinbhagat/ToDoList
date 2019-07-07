import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Axios from 'axios';
import { BE_URL } from './Config';
import M, { options } from 'materialize-css';

import './index.css';
import NavBar from './Components/Navigation/NavBar';
import AllToDos from './Components/ToDos/AllToDos';
import AddToDos from './Components/ToDos/AddToDos';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { ToDoList: [] };
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems, options);
        });
    }
    componentWillMount() {
        if (this.state.ToDoList.length === 0)
            Axios.post(BE_URL).then(response => {
                this.setState({ ToDoList: response.data.payload });
            }).catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <Router>
                    <NavBar />
                    <AddToDos setToDos={this.setToDos} />
                    <Route exact path="/" render={props => <AllToDos setToDos={this.setToDos} ToDoList={this.state.ToDoList} filter='' {...props} />} />
                    <Route path="/inprogress" render={props => <AllToDos setToDos={this.setToDos} ToDoList={this.state.ToDoList} filter='inprogress' {...props} />} />
                    <Route path="/complete" render={props => <AllToDos setToDos={this.setToDos} ToDoList={this.state.ToDoList} filter='complete' {...props} />} />
                    <Route path="/pending" render={props => <AllToDos setToDos={this.setToDos} ToDoList={this.state.ToDoList} filter='pending' {...props} />} />
                </Router>
            </div>
        );
    }
    setToDos = ToDos => {
        this.setState({ ToDoList: ToDos });
    }
}

render(<Main />, document.querySelector('#root'));