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
