import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');
var restaurants = require('./restaurants.json')

class SpecificWorld extends Component {

  constructor(){
    super();
    this.state={
      attractions: [{}],
      quickService: [],
      tableService: []
    }
  }

  componentDidMount(){
    let world = this.props.match.params.World.split('-').join(' ')
    console.log(world);
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    this.getAttractions(world);
    this.getQuickService(world);
    this.getTableService(world);
  }

  componentWillReceiveProps(newProps){
    let world = newProps.match.params.World.split('-').join(' ')
    console.log(world);
    $(".dropdown-button").dropdown( { hover: true } );
    this.getAttractions(world);
    this.getQuickService(world);
    this.getTableService(world);
  }

  getAttractions(world){
    axios.get('http://localhost:8080')
      .then(response => response.data.sort(function(a,b){
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
        if(nameA < nameB){
          return -1
        } else if (nameA > nameB){
          return 1
        } else {
          return 0
        }
      }))
      .then(array => array.filter(object => object.name.includes('Halloween') !== true))
      .then(array => array.filter(object => object.name.includes('Christmas') !== true))
      .then(array => array.filter(object => object.name.includes('Pirate and Princess') !== true))
      .then(array => array.filter(object => object.name.includes('Pirates at Walt Disney World') !== true))
      .then(array => array.filter(object => object.world == world.charAt(0).toUpperCase() + world.slice(1)))
      .then(array => this.setState({ attractions: array }))
  }

  getQuickService(world){
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/dining.json`)
      .then(response => response.data[0].map(function(restaurant){
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
      .then(array => array.filter(object => object.world == world.charAt(0).toUpperCase() + world.slice(1)))
      .then(response => this.setState({ quickService: response }))
  }

  getTableService(world){
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
      .then(array => array.filter(object => object.world == world.charAt(0).toUpperCase() + world.slice(1)))
      .then(response => this.setState({ tableService: response }))
  }

  displayQuickService(){
    if(this.state.quickService.length > 0){
      return (
        <ul className="row col s6">
          <h4 className="center-align">Quick Service Restaurants</h4>
          {this.state.quickService.map(restaurant => {
            return (
              <li className="card-panel image-container col s8 offset-s2 center-align">

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

  displayTableService(){
    if(this.state.tableService.length > 0){
      return (
        <ul className="row col s6">
          <h4 className="center-align">Table Service Restaurants</h4>
          {this.state.tableService.map(restaurant => {
            return (
              <li className="card-panel image-container col s8 offset-s2 center-align">

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

  displayAttractions(){
    if(this.state.attractions.length > 1){
      return (
        <ul className="row">
          <h4 className="center-align">Attractions</h4>
          {this.state.attractions.map(attraction => {
            return (
              <li className="card-panel image-container col s4 center-align">

                <Link to={`/attraction/${attraction.id}`}>
                  <img className="responsive-img" src={`${attraction.image}`}/>
                  <div><b>{attraction.name}</b></div>
                  <div>{this.waitTime(attraction)}</div>
                </Link>

              </li>
            )
          })}
        </ul>
      )
    }
  }

  waitTime(attraction){
    if(attraction.type ==="ride"){
      if(attraction.status === "Operating"){
        return (
           <div>Wait Time: <em>{attraction.waitTime} minutes</em></div>
        )
      } else {
        return (
          <div>Status: <em>{attraction.status}</em></div>
        )
      }
    }
  }

  render(){
    //console.log(this.state.attractions);
    console.log(this.state.tableService);
    return(
      <div className="specificWorld container">

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
          {this.displayAttractions()}
          <div className="row">
            {this.displayQuickService()}
            {this.displayTableService()}
          </div>
        </section>

      </div>
    )
  }

}

export default SpecificWorld;
