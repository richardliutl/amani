import React, { Component } from "react";
import { Link } from '@reach/router'

import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="NavBar-container">      
        <Link to="/">
          <p className="NavBar-title">
            Amani
          </p>
        </Link>
        <Link to="/login">
          <p className="NavBar-login">
            Login
          </p>
        </Link>
        
      </nav>
    );
  }
}

export default NavBar;
