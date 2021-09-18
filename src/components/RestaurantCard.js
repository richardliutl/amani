import React, { Component } from "react";

import "./RestaurantCard.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class RestaurantCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2 className="RestaurantCard-title">{this.props.name}</h2>
        <h3 className="RestaurantCard-rating">Rating: {this.props.rating}</h3>
      </>
    );
  }
}

export default RestaurantCard;
