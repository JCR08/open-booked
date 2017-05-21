import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class Home extends Component {

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
  }

  render(){
    return(
      <div className="homePage container">

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
              <li className="col s6 center-align">
                <Link className="black-text" to="/attractions">
                  Attractions
                </Link>
              </li>
              <li className="col s6 center-align">
                <div className="black-text dropdown-button"
                  data-beloworigin="true"
                  data-activates="diningDropdown">
                  Dining
                </div>
              </li>
            </ul>
          </div>
        </nav>


        <section className="worlds row">
            <div className="world-logos valign-wrapper image-container col s4">
              <Link to='/world/main-street-usa'>
                <img className="responsive-img" src="../world-logos/Main-Street.svg" alt="Main Street, USA logo"/>
              </Link>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <Link to='/world/adventureland'>
                <img className="responsive-img" src="../world-logos/Adventureland.svg" alt="Adventureland logo"/>
              </Link>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <Link to='/world/frontierland'>
                <img className="responsive-img" src="../world-logos/Frontierland.svg" alt="Frontierland logo"/>
              </Link>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <Link to='/world/liberty-square'>
                <img className="responsive-img" src="../world-logos/Liberty-Square.png" alt="Liberty Square logo"/>
              </Link>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <Link to='/world/fantasyland'>
                <img className="responsive-img" src="../world-logos/Fantasyland.png" alt="Fantasyland logo"/>
              </Link>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <Link to='/world/tomorrowland'>
                <img className="responsive-img" src="../world-logos/Tomorrowland.svg" alt="Tomorrowland logo"/>
              </Link>
            </div>
        </section>
      </div>
    )
  }
}

export default Home;
