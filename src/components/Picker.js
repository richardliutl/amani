import React, { Component } from "react";

import "./Picker.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class Picker extends Component {
  constructor(props) {
    super(props);

    this.state = {
        category: "american",
        catering: false,
        rating: "any-rating"
    };

  }

  handleCategoryChange = (event) => {
    this.setState({
        category: event.target.value
    });
  }

  handleCateringChange = (event) => {
    this.setState({
        catering: event.target.value
    });
  }

  handleRatingChange = (event) => {
    this.setState({
        rating: event.target.value
    });
  }

  render() {
    return (
      <>
        <p>Enter your preferences for the restaurant.</p>
        <div className="Picker-item">
            <label className="Picker-label">Catering</label>
            <input type="checkbox" id="catering" value={this.state.catering} onChange={this.handleCateringChange}></input>
        </div>
        <div className="Picker-item">
            <label className="Picker-label">Category</label>
            <select defaultValue="american" value={this.state.category} onChange={this.handleCategoryChange}>
                <option value="american">American</option>
                <option value="indian">Indian</option>
                <option value="asian">Asian</option>
                <option value="fast-food">Fast Food</option>
                <option value="chinese">Chinese</option>
                <option value="dessert">Desserts</option>
                <option value="burgers">Burgers</option>
                <option value="healthy">Healthy</option>
                <option value="halal">Halal</option>
                <option value="pizza">Pizza</option>
                <option value="vegetarian">Vegetarian</option>
            </select>
        </div>
        <div className="Picker-item">
            <label className="Picker-label">Rating</label>
            <select defaultValue="4.5" value={this.state.rating} onChange={this.handleRatingChange}>
                <option value="4.5">Over 4.5</option>
                <option value="4.0">Over 4.0</option>
                <option value="3.5">Over 3.5</option>
                <option value="3.0">Over 3.0</option>
                <option value="any-rating">Any rating</option>
            </select>
        </div>
        <div className="Picker-button">
            <input type="button" value="Spin da wheel"></input>
        </div>
        <div className="Picker-wheel">
            <h1>giant ass spinning wheel</h1>
        </div>
      </>
    );
  }
}

export default Picker;
