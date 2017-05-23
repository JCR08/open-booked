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
      restaurant: {},
      menu: [],
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
        restaurant["menus"] = restaurantMatch["menus"]
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

  displayMenuButtons(){
    const rest = this.state.restaurant;
    return(
      <ul className="menuButtonDisplay card row col s4 center-align">
        <h5><u>Choose Menu</u></h5>
        {rest.menus.map(menu => {
          if(menu.url){
            return(
              <li className="col s6 center-align">
                <div onClick={this.setMenuState.bind(this, menu)} className="menuButton waves-effect waves-light btn #bbdefb blue lighten-4">{menu.meal}</div>
              </li>
          )}
        }
      )}
      </ul>
    )
  }

  setMenuState(menu){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/dining/${this.props.match.params.permalink}/menus/${menu.url}.json`)
      .then(response => this.setState({ menu: response.data[2].menu_links }))
  }

  displayMenu(){
    const menu = this.state.menu;
    console.log(menu);
    return (
      <div className="menuDisplay card col s7 push-s1">
        {menu.map(object => {
          return (
            <ul className="col s12 ">
              <li className="center-align">
                <b><u>{object.group}</u></b>
              </li>
              <li className="center-align">
                {object.links.map(items => {
                  return(
                    <span>
                      <div className="col s8 left-align">{items.name}</div>
                      <div className="col s2 push-s2 right-align">{items.price}</div>
                    </span>
                  )
                })}
              </li>
            </ul>
          )
        })}
      </div>
    )
  }

  render(){
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

        <section className="info">
          {this.state.restaurant.name && this.displayState()}
        </section>

        <section className="menu row">
          {this.state.restaurant.menus && this.displayMenuButtons()}
          {this.state.menu.length > 0 && this.displayMenu() }
        </section>


      </div>
    )
  }
}

export default SingleRestaurant
