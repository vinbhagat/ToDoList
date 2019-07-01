import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavItem extends Component {
    render() {
        return (
            <li><Link className="active" to={this.props.link}>{this.props.status}</Link></li>
        )
    }
}

export default NavItem;