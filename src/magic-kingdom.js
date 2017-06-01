import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class MagicKingdom extends Component {

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
  }

  render(){
    return(
      <div className="homePage container">

        <section className="worlds row">
            <div className="world-logos card-panel valign-wrapper image-container col s4">
              <Link to='/world/Main-Street-USA'>
                <img className="responsive-img" src="../world-logos/Main-Street.svg" alt="Main Street, USA logo"/>
              </Link>
            </div>
            <div className="world-logos card-panel valign-wrapper image-container col s4">
              <Link to='/world/Adventureland'>
                <img className="responsive-img" src="../world-logos/Adventureland.svg" alt="Adventureland logo"/>
              </Link>
            </div>
            <div className="world-logos card-panel valign-wrapper image-container col s4">
              <Link to='/world/Frontierland'>
                <img className="responsive-img" src="../world-logos/Frontierland.svg" alt="Frontierland logo"/>
              </Link>
            </div>
            <div className="world-logos card-panel valign-wrapper image-container col s4">
              <Link to='/world/Liberty-Square'>
                <img className="libertySquare responsive-img" src="../world-logos/Liberty-Square.png" alt="Liberty Square logo"/>
              </Link>
            </div>
            <div className="world-logos card-panel valign-wrapper image-container col s4">
              <Link to='/world/Fantasyland'>
                <img className="responsive-img" src="../world-logos/Fantasyland.png" alt="Fantasyland logo"/>
              </Link>
            </div>
            <div className="world-logos card-panel valign-wrapper image-container col s4">
              <Link to='/world/Tomorrowland'>
                <img className="responsive-img" src="../world-logos/Tomorrowland.svg" alt="Tomorrowland logo"/>
              </Link>
            </div>
        </section>
      </div>
    )
  }
}

export default MagicKingdom;
