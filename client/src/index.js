import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './Components/Navigation/NavBar';
import AllToDos from './Components/ToDos/AllToDos';
import CompleteToDos from './Components/ToDos/CompleteToDos';
import PendingToDos from './Components/ToDos/PendingToDos';
import InProgressToDos from './Components/ToDos/InProgressToDos';
const Main = () => {
    return (
        <div>
            <Router>
                <NavBar />
                <Route exact path="/" render={props => <AllToDos  {...props} />} />
                <Route path="/inprogress" render={props => <InProgressToDos  {...props} />} />
                <Route path="/complete" render={props => <CompleteToDos  {...props} />} />
                <Route path="/pending" render={props => <PendingToDos  {...props} />} />
            </Router>
        </div>
    );
}

render(<Main />, document.querySelector('#root'));