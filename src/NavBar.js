import React, { Component } from "react";

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
        <p className="NavBar-title">
          Amani
        </p>
      </nav>
    );
  }
}

export default NavBar;
