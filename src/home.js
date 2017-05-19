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
          <li><a className="center-align" href="#!">Quick Service</a></li>
          <li className="divider"></li>
          <li><a className="center-align" href="#!">Table Service</a></li>
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
                <a className="black-text dropdown-button"
                  data-beloworigin="true"
                  href="#!"
                  data-activates="diningDropdown">
                  Dining
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>


        <div className="worlds row">
            <div className="world-logos valign-wrapper image-container col s4">
              <img className="responsive-img" src="../world-logos/Main-Street.svg" alt="Main Street, USA logo"/>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <img className="responsive-img" src="../world-logos/Adventureland.svg" alt="Adventureland logo"/>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <img className="responsive-img" src="../world-logos/Frontierland.svg" alt="Frontierland logo"/>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <img className="responsive-img" src="../world-logos/Liberty-Square.png" alt="Liberty Square logo"/>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <img className="responsive-img" src="../world-logos/Fantasyland.png" alt="Fantasyland logo"/>
            </div>
            <div className="world-logos valign-wrapper image-container col s4">
              <img className="responsive-img" src="../world-logos/Tomorrowland.svg" alt="Tomorrowland logo"/>
            </div>
        </div>
      </div>
    )
  }
}

export default Home;
