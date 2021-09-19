import React, { Component } from "react";
import BigAssWheel from "./BigAssWheel";
import ActiveOption from "./ActiveOption";

import "./Picker.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class Picker extends Component {
  constructor(props) {
    super(props);

    const data = [{'formatted_address': '450 Massachusetts Ave, Cambridge, MA 02139, United States', 'name': 'Veggie Galaxy', 'opening_hours': {'open_now': true}, 'place_id': 'ChIJJ5JOZVR344kRd62Nb9Yo06s', 'price_level': 2, 'rating': 4.7, 'user_ratings_total': 2969, 'url': 'https://maps.google.com/?q=450 Massachusetts Ave, Cambridge, MA 02139, United States'}, {'formatted_address': '928 Massachusetts Ave, Cambridge, MA 02139, United States', 'name': "Pammy's", 'opening_hours': {'open_now': true}, 'place_id': 'ChIJC35Yf1B344kRAg1CTTMsPU8', 'price_level': 3, 'rating': 4.7, 'user_ratings_total': 536, 'url': 'https://maps.google.com/?q=928 Massachusetts Ave, Cambridge, MA 02139, United States'}, {'formatted_address': '134 Hampshire St, Cambridge, MA 02139, United States', 'name': 'Oleana', 'opening_hours': {'open_now': true}, 'place_id': 'ChIJr3IT1LJw44kRT5T9CYsihK4', 'price_level': 3, 'rating': 4.7, 'user_ratings_total': 1192, 'url': 'https://maps.google.com/?q=134 Hampshire St, Cambridge, MA 02139, United States'}, {'formatted_address': '765 Massachusetts Ave, Cambridge, MA 02139, United States', 'name': 'Life Alive Organic Cafe', 'opening_hours': {'open_now': true}, 'place_id': 'ChIJLb3sGVF344kRl8CdANSNwDI', 'price_level': 2, 'rating': 4.6, 'user_ratings_total': 1751, 'url': 'https://maps.google.com/?q=765 Massachusetts Ave, Cambridge, MA 02139, United States'}, {'formatted_address': '505 Massachusetts Ave, Cambridge, MA 02139, United States', 'name': 'Little Donkey', 'opening_hours': {'open_now': true}, 'place_id': 'ChIJGTS3dVR344kRy3uxf6fp5CE', 'price_level': 2, 'rating': 4.5, 'user_ratings_total': 1608, 'url': 'https://maps.google.com/?q=505 Massachusetts Ave, Cambridge, MA 02139, United States'}, {'formatted_address': '24 Pearl St, Cambridge, MA 02139, United States', 'name': 'Rangzen Tibetan Place', 'opening_hours': {'open_now': true}, 'place_id': 'ChIJVxZ8HVR344kRTTbait6B334', 'price_level': 2, 'rating': 4.5, 'user_ratings_total': 401, 'url': 'https://maps.google.com/?q=24 Pearl St, Cambridge, MA 02139, United States'}, {'formatted_address': '546 Massachusetts Ave, Cambridge, MA 02139, United States', 'name': 'Five Spices House', 'opening_hours': {'open_now': true}, 'place_id': 'ChIJxVSOzfd344kR1jlxoNiN3Bk', 'price_level': 2, 'rating': 4.5, 'user_ratings_total': 217, 'url': 'https://maps.google.com/?q=546 Massachusetts Ave, Cambridge, MA 02139, United States'}, {'formatted_address': '739 Massachusetts Ave, Cambridge, MA 02139, United States', 'name': 'Asmara', 'opening_hours': {'open_now': true}, 'place_id': 'ChIJkSq1F1F344kRqz4wC8PzNjY', 'price_level': 2, 'rating': 4.5, 'user_ratings_total': 429, 'url': 'https://maps.google.com/?q=739 Massachusetts Ave, Cambridge, MA 02139, United States'}, {'formatted_address': '567 Massachusetts Ave, Cambridge, MA 02139, United States', 'name': 'Brick & Mortar', 'opening_hours': {'open_now': true}, 'place_id': 'ChIJB1ld91N344kR0s6509oBiak', 'price_level': 2, 'rating': 4.4, 'user_ratings_total': 601, 'url': 'https://maps.google.com/?q=567 Massachusetts Ave, Cambridge, MA 02139, United States'}, {'formatted_address': '524 Massachusetts Ave, Cambridge, MA 02139, United States', 'name': 'The Mad Monkfish', 'opening_hours': {'open_now': true}, 'place_id': 'ChIJ837FC1R344kRVlYqVsoSQew', 'price_level': 2, 'rating': 4.4, 'user_ratings_total': 1590, 'url': 'https://maps.google.com/?q=524 Massachusetts Ave, Cambridge, MA 02139, United States'}];

    this.state = {
        category: "american",
        catering: false,
        rating: "any-rating",
        wheelData: data,
        wheelAngle: 0,
    };
  }

  handleAngleChange = (wheelAngle) => {
    this.setState({
        wheelAngle: wheelAngle
    });
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
    function setAngle(t) {
      this.props.wheelAngle = t;
    }

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
        <ActiveOption data={this.state.wheelData} wheelAngle={this.state.wheelAngle}/>
        <div className="Picker-wheel">
            {/* <h1>giant ass spinning wheel</h1> */}
            <BigAssWheel data={this.state.wheelData} setAngle={this.handleAngleChange}/>
        </div>
      </>
    );
  }
}

export default Picker;
