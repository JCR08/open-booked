import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');
var restaurants = require('./restaurants.json')

class TableService extends Component {

  constructor(){
    super();
    this.state={
      restaurants: [{}]
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/dining.json`)
      .then(response => response.data[1].map(function(restaurant){
        var restaurantMatch = restaurants.find(function(elm){
          return elm["place"] === restaurant["name"];
        });
        if(restaurantMatch){
          restaurant["description"] = restaurantMatch["description"]
          restaurant["diningLink"] = restaurantMatch["diningLink"]
          restaurant["image"] = restaurantMatch["image"]
          restaurant["locationLink"] = restaurantMatch["locationLink"]
          restaurant["menus"] = restaurantMatch["menus"]
          restaurant["price"] = restaurantMatch["price"]
          restaurant["type"] = restaurantMatch["type"]
          restaurant["world"] = restaurantMatch["world"]
        }
        return restaurant
      }))
      .then(response => this.setState({restaurants: response}))
  }

  displayState(){
    return (
      <ul className="row">
        {this.state.restaurants.map(restaurant => {
          return (
            <li className="card-panel image-container col s4 center-align">
              <Link to={`/${restaurant.locationLink}/${restaurant.diningLink}/restaurant/${restaurant.permalink}`}>
                <img className="responsive-img" src={`${restaurant.image}`}/>
                <div><b>{restaurant.name}</b></div>
                <div>Location: {restaurant.world}</div>
                <div><em>Price Range: {restaurant.price}</em></div>
              </Link>

            </li>
          )
        })}
      </ul>
    )
  }

  displayLoader(){
    return(
      <div className="center-align loader">
      <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      </div>
    )
  }

  render(){
    return(
      <div className="tableService container">
        <h4 className="center-align">Table Service Restaurants</h4>
        <section>
          {this.state.restaurants.length == 1 && this.displayLoader()}
          {this.state.restaurants.length > 1 && this.displayState()}
        </section>

      </div>
    )
  }
}

export default TableService;
