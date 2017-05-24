import React, { Component } from 'react';
import materializecss from 'materialize-css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import base from './rebase';
var $ = window.jQuery = require('jquery');

class SingleAttraction extends Component{

  constructor(){
    super();
    this.state={
      user: {},
      comments: [],
      attraction: []

    }
  }

  componentDidMount(){
    window.$ = window.jQuery;
    $(".dropdown-button").dropdown( { hover: true } );
    axios.get('http://localhost:8080')
    .then(response => response.data.filter(data => data.id.includes(`${this.props.match.params.id}`) == true))
    .then(object => this.setState({ attraction: object[0] }))
    base.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user: user
        })
      } else {
        this.setState({
          user: {}
        })
      }
    })
    console.log(this.state.attraction.name);
    base.syncState(`/attraction/${this.props.match.params.id}/comments`, {
	    context: this,
	    state: "comments",
	    asArray: true
    })
  }

  displayState(){
    const attraction = this.state.attraction
    return(
      <div className="card row">
        <div className="attractionImage col s6 center-align">
          <img className="responsive-img" src={`${attraction.image}`} alt="#"/>
        </div>
        <div className="attractionInfo col s6 center-align">
          <h4><u>{attraction.name}</u></h4>
          <p>Location: {attraction.world}</p>
          <p>{this.fastpass(attraction)}</p>
          <p>{attraction.description}</p>
          <div>{this.waitTime(attraction)}</div>
        </div>
      </div>
    )
  }

  waitTime(attraction){
    if(attraction.type ==="ride"){
      if(attraction.status === "Operating"){
        return (
           <div>Wait Time: <em>{attraction.waitTime} minutes</em></div>
        )
      } else {
        return (
          <div>Status: <em>{attraction.status}</em></div>
        )
      }
    }
  }

  fastpass(attraction){
    if(attraction.fastPass == true){
      return (
        <p>Fastpass is available for this attraction.</p>
      )
    } else {
      return (
        <p>Fastpass is not available for this attraction.</p>
      )
    }
  }

  submitComment(event){
    event.preventDefault();
    const comment = this.comment.value;
    let newComment = base.push(`/attraction/${this.props.match.params.id}/comments`, {
      data: {comment}
    })
    // this.setState({
    //   comments: this.state.comments.concat([comment])
    // })
    this.comment.value = '';
  }

  displayComment(){
    if(this.state.user.uid){
      return(
        <div className="card row">

          <div className="leaveComment row col s12 center-align">
            <form onSubmit={this.submitComment.bind(this)}>
              <input
                placeholder='Leave a Comment'
                ref={element => this.comment = element}
              />
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>

        </div>
      )
    } else {
      return(
        <div className="row">
          <div className="col s12 center-align">
            <div onClick={this.login.bind(this)} className="waves-effect waves-light btn #bbdefb blue lighten-4">Login to view or leave comments</div>
          </div>
        </div>
      )
    }
  }

  login (){
    var authHandler = (error, data) => {
      this.setState({
        user: data.user
      })
    }
    base.authWithOAuthPopup('google', authHandler)
  }

  render(){
    console.log(this.state.comments);
    return(
      <div className="singleAtttraction container">

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
          {this.state.attraction.name && this.displayState()}
        </section>

        <section>
          {this.displayComment()}
        </section>

      </div>
    )
  }
}

export default SingleAttraction;
