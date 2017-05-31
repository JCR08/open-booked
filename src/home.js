import React, { Component } from 'react';
import materializecss from 'materialize-css';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class Home extends Component {

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
  }

  render(){
    return(
      <div className="container">

        <section className="hotels row">
          <div className="card col s4 center-align">
            <Link to='/magic-kingdom'>
              <img className="responsive-img" src="https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/640/360/75/wdpromedia.disney.go.com/media/wdpro-assets/gallery/destinations/magic-kingdom/magic-kingdom-gallery00.jpg?06052013091601" alt="Magic Kingdom Park"/>
              <div><b>Magic Kingdom Park</b></div>
            </Link>
          </div>
          <div className="card col s4 center-align">
            <Link to='/hotels'>
              <img className="responsive-img" src="https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/640/360/75/wdpromedia.disney.go.com/media/wdpro-assets/gallery/resorts/grand-floridian/overview/grand-floridian-resort-and-spa-gallery02.jpg?13112014113039" alt="Hotels"/>
              <div><b>Hotels</b></div>
            </Link>
          </div>
          <div className="card col s4 center-align">
            <Link to='/dining'>
              <img className="responsive-img" src="https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/640/360/75/wdpromedia.disney.go.com/media/wdpro-assets/gallery/dining/magic-kingdom/be-our-guest-restaurant/be-our-guest-restaurant-gallery06.jpg?30122013120300" alt="Dining"/>
              <div><b>Dining</b></div>
            </Link>
          </div>
        </section>

      </div>
    )
  }
}

export default Home;
