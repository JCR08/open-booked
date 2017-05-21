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
      restaurant: []
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    axios.get(`https://tiy-orl-proxy.herokuapp.com/disney/magic-kingdom/dining/${this.props.match.params.permalink}.json`)
    .then(response => this.setState({restaurant: response.data}))
  }

  render(){
    console.log(this.state.restaurant);
    return(
      <div className="singleRestaurant container">

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

        </section>

      </div>
    )
  }
}

export default SingleRestaurant
