import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import base from './rebase';
var $ = window.jQuery = require('jquery');
var hotels = require('./hotels.json')

class SingleHotel extends Component{

  constructor(){
    super()
    this.state={
      user: {},
      comments: [],
      hotel: [{}],
      restaurants: []
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/walt-disney-world/hotels/${this.props.match.params.specifichotel}.json`)
    .then(function(response){
      var hotelMatch = hotels.find(function(elm){
        return elm["place"] === response.data["name"];
      });
      let hotel = response.data
      if(hotelMatch){
        hotel["description"] = hotelMatch["description"]
        hotel["image"] = hotelMatch["image"]
      }
      return hotel
    })
    .then(response => this.setState({hotel: response}))
    base.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user: user
        })
        base.syncState(`/restaurant/${this.props.match.params.permalink}/comments`, {
          context: this,
          state: "comments",
          asArray: true
        })
      } else {
        this.setState({
          user: {},
          comments: {}
        })
      }
    })
  }

  componentWillReceiveProps(newProps){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/walt-disney-world/hotels/${newProps.match.params.specifichotel}.json`)
    .then(function(response){
      var hotelMatch = hotels.find(function(elm){
        return elm["place"] === response.data["name"];
      });
      let hotel = response.data
      if(hotelMatch){
        hotel["description"] = hotelMatch["description"]
        hotel["image"] = hotelMatch["image"]
      }
      return hotel
    })
    .then(response => this.setState({hotel: response}))
  }

  displayState(){
    const hotel = this.state.hotel;
    return(
      <div className="card row">
        <div className="HotelImage col s6 center-align">
          <img className="responsive-img" src={`${hotel.image}`} alt="#"/>
        </div>
        <div className="restaurantInfo col s6 center-align">
          <h4><u>{hotel.name}</u></h4>
          <p>Price Range: {hotel.cost_range} per night</p>
          <p>{hotel.description}</p>
        </div>
      </div>
    )
  }


  render(){
    console.log(this.state.hotel);
    return(
      <div className="singleHotel container">

        <section className="info">
          {this.state.hotel.name && this.displayState()}
        </section>

      </div>
    )
  }
}

export default SingleHotel
