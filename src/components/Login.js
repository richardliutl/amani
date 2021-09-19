import React, { Component } from "react";

import "./Login.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2>
          Log in to Amani
        </h2>
        <div className="Login-item">
          <label htmlFor="username" className="Login-label">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"/>
        </div>
        <div className="Login-item">
          <label htmlFor="password" className="Login-label">Password</label>
          <input
            type="password"
            name="password"/>
        </div>
        <input type="button" value="Log in"></input>
      </>
    );
  }
}

export default Login;
