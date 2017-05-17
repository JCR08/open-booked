import React, { Component } from 'react';

class Home extends Component {
  render(){
    return(
      <div className="homePage container">
        <div className="navBar row card-panel #e3f2fd blue lighten-5">
          <div className="dropDown col s6 center-align">
            Attractions
          </div>
          <div className="dropDown col s6 center-align">
            Dining
          </div>
        </div>
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
