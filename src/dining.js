import React, { Component } from 'react';
import materializecss from 'materialize-css';
import { Link } from 'react-router-dom';
var $ = window.jQuery = require('jquery');

class Dining extends Component {

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
  }

  render(){
    return(
      <div className="container">

        <section className="hotels row">
          <div className="card col s6 center-align">
            <Link to='/dining/quick-service'>
              <img className="responsive-img" src="https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/630/354/75/wdpromedia.disney.go.com/media/wdpro-assets/things-to-do/dining/hollywood-studios/oasis-canteen/oasis-canteen-01.jpg?28042016141140" alt="Quick Service"/>
              <div><b>Quick Service Dining</b></div>
            </Link>
          </div>
          <div className="card col s6 center-align">
            <Link to='/dining/table-service'>
              <img className="responsive-img" src="https://secure.parksandresorts.wdpromedia.com/resize/mwImage/1/640/360/75/wdpromedia.disney.go.com/media/wdpro-assets/gallery/dining/magic-kingdom/liberty-tree-tavern/liberty-tree-tavern-gallery08.jpg?25032016114418" alt="Table Service"/>
              <div><b>Table Service Dining</b></div>
            </Link>
          </div>
        </section>

      </div>
    )
  }
}

export default Dining
