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
          restaurant["image"] = restaurantMatch["image"]
          restaurant["price"] = restaurantMatch["price"]
          restaurant["type"] = restaurantMatch["type"]
          restaurant["world"] = restaurantMatch["world"]
        }
        return restaurant
      }))
      .then(response => this.setState({restaurants: response}))
  }

  displayState(){
    if(this.state.restaurants.length > 1){
      return (
        <ul className="row">
          {this.state.restaurants.map(restaurant => {
            return (
              <li className="card-panel image-container col s4 center-align">

                <Link to={`/dining/quick-service-restaurant/${restaurant.permalink}`}>
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
  }

  render(){
    console.log(this.state.restaurants);
    return(
      <div className="tableService container">

        <ul id="worldsDropdown" className="dropdown-content">
          <li>
            <Link to='/world/main-street-usa'>
              Main Street, USA
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/adventurland'>
              Adventureland
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/frontierland'>
              Frontierland
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/liberty-square'>
              Liberty Square
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/fantasyland'>
              Fantasyland
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to='/world/tomorrowland'>
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
        </ul>

        <nav>
          <div className="nav-wrapper row #e3f2fd blue lighten-5">
            <ul className="hide-on-med-and-down">
              <li className="col s4 center-align">
                <a className="black-text dropdown-button"
                  data-beloworigin="true"
                  href="#!"
                  data-activates="worldsDropdown">
                  Worlds
                </a>
              </li>

              <li className="col s4 center-align">
                <Link className="black-text" to="/attractions">
                  Attractions
                </Link>
              </li>

              <li className="col s4 center-align">
                <a className="black-text dropdown-button"
                  data-beloworigin="true"
                  href="#!"
                  data-activates="diningDropdown">
                  Dining
                </a>
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

export default TableService;
