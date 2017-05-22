import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');
var restaurants = require('./restaurants.json')

class SingleRestaurant extends Component{

  constructor(){
    super();
    this.state={
      restaurant: {}
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/dining/${this.props.match.params.permalink}.json`)
    .then(function(response){
      var restaurantMatch = restaurants.find(function(elm){
        return elm["place"] === response.data["name"];
      });
      let restaurant = response.data
      if(restaurantMatch){
        restaurant["description"] = restaurantMatch["description"]
        restaurant["image"] = restaurantMatch["image"]
        restaurant["price"] = restaurantMatch["price"]
        restaurant["type"] = restaurantMatch["type"]
        restaurant["world"] = restaurantMatch["world"]
      }
      return restaurant
    })
    .then(response => this.setState({restaurant: response}))
  }

  reservations(rest){
    if(rest.accepts_reservations){
      return(
        <p>Accepts Reservations</p>
      )
    }
  }

  displayState(){
    const rest = this.state.restaurant;
    return(
      <div className="card row">
        <div className="restaurantImage col s6 center-align">
          <img className="responsive-img" src={`${rest.image}`} alt="#"/>
        </div>
        <div className="restaurantInfo col s6 center-align">
          <h4><u>{rest.name}</u></h4>
          <p>Location: {rest.world}</p>
          <p>{this.reservations(rest)}</p>
          <p>Food Type: {rest.cuisine}</p>
          <p>Price Range: {rest.price}</p>
          <p>{rest.description}</p>
        </div>
      </div>
    )
  }

  render(){
    console.log(this.state.restaurant);
    return(
      <div className="singleRestaurant container">

        <ul id="worldsDropdown" className="dropdown-content">
          <li>
            <Link to='/world/Main-Street-USA'>
              Main Street, USA
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/Adventureland'>
              Adventureland
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/Frontierland'>
              Frontierland
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/Liberty-Square'>
              Liberty Square
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/Fantasyland'>
              Fantasyland
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/Tomorrowland'>
              Tomorrowland
            </Link>
          </li>
        </ul>

        <ul id="diningDropdown" className="dropdown-content">
          <li>
            <Link className="center-align" to="/dining/quick-service">
              Quick Service
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link className="center-align" to="/dining/table-service">
              Table Service
            </Link>
          </li>
        </ul>

        <nav>
          <div className="nav-wrapper row #e3f2fd blue lighten-5">
            <ul className="hide-on-med-and-down">
              <li className="col s4 center-align">
                <div className="black-text dropdown-button"
                  data-beloworigin="true"
                  data-activates="worldsDropdown">
                  Worlds
                </div>
              </li>

              <li className="col s4 center-align">
                <Link className="black-text" to="/attractions">
                  Attractions
                </Link>
              </li>

              <li className="col s4 center-align">
                <div className="black-text dropdown-button"
                  data-beloworigin="true"
                  data-activates="diningDropdown">
                  Dining
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <section>
          {this.displayState()}
        </section>

      </div>
    )
  }
}

export default SingleRestaurant
