import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import base from './rebase';
var $ = window.jQuery = require('jquery');
var hotels = require('./hotels.json')
var restaurants = require('./restaurants.json')

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
    let props = this.props
    this.getHotel()
    this.getRestaurants(props)
  }

  componentWillReceiveProps(newProps){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    this.newHotel(newProps)
    this.newRestaurants(newProps)
  }

  getHotel(){
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
  }

  getRestaurants() {
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/walt-disney-world/resort-dining.json`)
    .then(response => response.data.filter(object => object.permalink === this.props.match.params.specifichotel))
    .then(response => {
      let dining = response[0].dinings
      var restaurantMatch = dining.map(elm => {
        var diningMatch = restaurants.find(object => {
          return elm.name === object.place
        })
        let restaurant = elm;
        if (diningMatch) {
          restaurant["description"] = diningMatch["description"]
          restaurant["diningLink"] = diningMatch["diningLink"]
          restaurant["image"] = diningMatch["image"]
          restaurant["locationLink"] = diningMatch["locationLink"]
          restaurant["menus"] = diningMatch["menus"]
          restaurant["price"] = diningMatch["price"]
          restaurant["type"] = diningMatch["type"]
          restaurant["world"] = diningMatch["world"]
        }
        return restaurant
      })
      let hotelRestaurants = restaurantMatch.filter(object => object.description)
      this.setState({restaurants: hotelRestaurants})
    })
  }

  newHotel(newProps){
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

  newRestaurants(newProps){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/walt-disney-world/resort-dining.json`)
    .then(response => response.data.filter(object => object.permalink === newProps.match.params.specifichotel))
    .then(response => {
      let dining = response[0].dinings
      var restaurantMatch = dining.map(elm => {
        var diningMatch = restaurants.find(object => {
          return elm.name === object.place
        })
        let restaurant = elm;
        if (diningMatch) {
          restaurant["description"] = diningMatch["description"]
          restaurant["diningLink"] = diningMatch["diningLink"]
          restaurant["image"] = diningMatch["image"]
          restaurant["locationLink"] = diningMatch["locationLink"]
          restaurant["menus"] = diningMatch["menus"]
          restaurant["price"] = diningMatch["price"]
          restaurant["type"] = diningMatch["type"]
          restaurant["world"] = diningMatch["world"]
        }
        return restaurant
      })
      let hotelRestaurants = restaurantMatch.filter(object => object.description)
      this.setState({restaurants: hotelRestaurants})
    })
  }

  displayHotel(){
    const hotel = this.state.hotel;
    return(
      <div className="card row">
        <div className="HotelImage col s6 center-align">
          <img className="responsive-img" src={`${hotel.image}`} alt="#"/>
        </div>
        <div className="restaurantInfo col s6 center-align">
          <h4><u>{hotel.name}</u></h4>
          <p>Phone: ({hotel.phone_number.substring(0,3)}) {hotel.phone_number.substring(3,6)}-{hotel.phone_number.substring(6,10)}</p>
          <p>Price Range: {hotel.cost_range} per night</p>
          <p>{hotel.description}</p>
        </div>
      </div>
    )
  }

  displayRestaurants(){
    console.log(this.state.restaurants)
    return(
      <ul className="row">
        {this.state.restaurants.map(restaurant => {
          return (
            <li className="card-panel image-container col s4 center-align">

              <Link to={`/${restaurant.locationLink}/${restaurant.diningLink}/restaurant/${restaurant.permalink}`}>
                <img className="responsive-img" src={`${restaurant.image}`}/>
                <div><b>{restaurant.name}</b></div>
                <div><em>Price Range: {restaurant.price}</em></div>
              </Link>

            </li>
          )
        })}
      </ul>
    )
  }


  render(){
    return(
      <div className="singleHotel container">

        <section className="info">
          {this.state.hotel.name && this.displayHotel()}
        </section>

        <section>
          {this.state.restaurants && this.displayRestaurants()}
        </section>

      </div>
    )
  }
}

export default SingleHotel
