import React, { Component } from 'react';
import NavItem from './NavItem';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoStatus: [{ text: "All", link: "/" }, { text: "Pending", link: "pending" }, { text: "In Progress", link: "inprogress" }, { text: "Complete", link: "complete" }]
        };
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <ul className="left hide-on-med-and-down">{this.state.todoStatus.map((todo, index) => {
                        return <NavItem key={`N${index}`} status={todo.text} link={todo.link} />
                    })}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;