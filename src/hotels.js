import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class Hotels extends Component{

  constructor(){
    super();
    this.state={
      hotels: []
    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
  }

  render(){
    return(
      <div className="hotels container">

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
            <ul>
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

        <section className="hotels row">
          <div className="card col s4 center-align">
            <Link to='/hotel/disneys-grand-floridian-resort'>
              <img className="responsive-img" src="https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/640/360/75/wdpromedia.disney.go.com/media/wdpro-assets/gallery/resorts/grand-floridian/overview/grand-floridian-resort-and-spa-gallery03.jpg?13112014113041" alt="Grand Floridian"/>
              <div><b>Disney's Grand Floridian Resort & Spa</b></div>
            </Link>
          </div>
          <div className="card col s4 center-align">
            <Link to='/hotel/disneys-polynesian-resort'>
              <img className="responsive-img" src="https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/640/360/75/wdpromedia.disney.go.com/media/wdpro-assets/gallery/polynesian/overview/polynesian-resort-gallery04.jpg?22062016101602" alt="Polynesian Village Resort"/>
              <div><b>Disney's Polynesian Village Resort</b></div>
            </Link>
          </div>
          <div className="card col s4 center-align">
            <Link to='/hotel/disneys-contemporary-resort'>
              <img className="responsive-img" src="https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/640/360/75/wdpromedia.disney.go.com/media/wdpro-assets/gallery/contemporary/overview/contemporary-resort-gallery04.jpg?14112012111247" alt="Contemporary Resort"/>
              <div><b>Disney's Contemporary Resort</b></div>
            </Link>
          </div>
        </section>

      </div>
    )
  }
}

export default Hotels;
