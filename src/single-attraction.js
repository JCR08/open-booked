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
    axios.get('http://intense-harbor-66125.herokuapp.com')
    .then(response => response.data.filter(data => data.id.includes(`${this.props.match.params.id}`) == true))
    .then(object => this.setState({ attraction: object[0] }))
    base.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({
          user: user
        })
        base.syncState(`/attraction/${this.props.match.params.id}/comments`, {
          context: this,
          state: "comments",
          asArray: true
        })
      } else {
        this.setState({
          user: {},
          comments: {}
        })
      }
    })
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
    console.log(this.state.user);
    const comment = this.comment.value;
    const userName = this.state.user.displayName
    const userAvatar = this.state.user.photoURL
    const attraction = this.state.attraction.name
    let newComment = base.push(`/attraction/${this.props.match.params.id}/comments`, {
      data: {
        comment,
        attraction,
        userName,
        userAvatar
      }
    })
    this.comment.value = '';
  }

  displayComment(){
    if(this.state.user.uid){
      return(
        <div className="card row">
          <div className="commentDisplay col s12 center-align">
            <div>
              {this.state.comments.map(comment => {
                return (
                  <div className="commentCard row center-align valign-wrapper">
                    <div className="row col s4">
                      <img src={`${comment.userAvatar}`} alt="" className="commentAvatar col s3 offset-s4 circle"/>
                      <div className="col s12 center-align">{comment.userName}</div>
                    </div>
                    <div className="pastComments col s6 offest-s1">{comment.comment}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="leaveComment row col s12 center-align">
            <form className="row"
              onSubmit={this.submitComment.bind(this)}>
              <input
                className="col s8 offset-s1"
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
