import React, { Component } from "react";
import BigAssWheel from "./BigAssWheel";

import "./Picker.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class Picker extends Component {
  constructor(props) {
    super(props);

    const data = [
      {"label":"Dell LAPTOP",  "value":1,  "question":"What CSS property is used for specifying the area between the content and its border?"}, // padding
      {"label":"IMAC PRO",  "value":2,  "question":"What CSS property is used for changing the font?"}, //font-family
      {"label":"SUZUKI",  "value":3,  "question":"What CSS property is used for changing the color of text?"}, //color
      {"label":"HONDA",  "value":4,  "question":"What CSS property is used for changing the boldness of text?"}, //font-weight
      {"label":"FERRARI",  "value":5,  "question":"What CSS property is used for changing the size of text?"}, //font-size
      {"label":"APARTMENT",  "value":6,  "question":"What CSS property is used for changing the background color of a box?"}, //background-color
      {"label":"IPAD PRO",  "value":7,  "question":"Which word is used for specifying an HTML tag that is inside another tag?"}, //nesting
      {"label":"LAND",  "value":8,  "question":"Which side of the box is the third number in: margin:1px 1px 1px 1px; ?"}, //bottom
      {"label":"MOTOROLLA",  "value":9,  "question":"What are the fonts that don't have serifs at the ends of letters called?"}, //sans-serif
      {"label":"BMW", "value":10, "question":"With CSS selectors, what character prefix should one use to specify a class?"}
    ];

    this.state = {
        category: "american",
        catering: false,
        rating: "any-rating",
        wheelData: data,
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
            {/* <h1>giant ass spinning wheel</h1> */}
            <BigAssWheel data={this.state.wheelData} />
        </div>
      </>
    );
  }
}

export default Picker;
