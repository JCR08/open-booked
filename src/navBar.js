import React, { Component } from 'react';
import materializecss from 'materialize-css';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class NavBar extends Component {
  render(){
    return(
      <div className="container">
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

        <ul id="hotelDropdown" className="dropdown-content">
          <li>
            <Link className="center-align" to="/hotels">
              All Hotels
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link className="center-align" to="/hotel/disneys-grand-floridian-resort">
              Disney's Grand Floridian Resort
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link className="center-align" to="/hotel/disneys-polynesian-resort">
              Disney's Polynesian Village Resort
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link className="center-align" to="/hotel/disneys-contemporary-resort">
              Disney's Contemporary Resort
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
          <div className="navBar nav-wrapper row #e1f5fe light-blue lighten-5">

            <ul>
              <li className="col s3 center-align">
                <div className="black-text dropdown-button"
                  data-beloworigin="true"
                  data-activates="worldsDropdown">
                  Magic Kingdom
                </div>
              </li>

              <li className="col s3 center-align">
                <div className="black-text dropdown-button"
                  data-beloworigin="true"
                  data-activates="hotelDropdown">
                  Hotels
                </div>
              </li>

              <li className="col s3 center-align">
                <Link className="black-text" to="/attractions">
                  Attractions
                </Link>
              </li>

              <li className="col s3 center-align">
                <div className="black-text dropdown-button"
                  data-beloworigin="true"
                  data-activates="diningDropdown">
                  Dining
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavBar
