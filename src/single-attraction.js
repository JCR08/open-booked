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
    axios.get('https://intense-harbor-66125.herokuapp.com')
    .then(response => response.data.filter(data => data.permalink === this.props.match.params.permalink))
    .then(object => this.setState({ attraction: object[0] }))
    base.auth().onAuthStateChanged(user => {
      if(user){
        console.log(user)
        this.setState({
          user: user,
        })
        base.syncState(`/attraction/${this.props.match.params.permalink}/comments`, {
          context: this,
          state: "comments",
          asArray: true
        })
      } else {
        this.setState({
          user: {},
          comments: []
        })
      }
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
          <h4>{attraction.name}</h4>
          <p>Location: {attraction.world}</p>
          <p>{this.fastpass(attraction)}</p>
          <p>{attraction.description}</p>
          <div>{this.waitTime(attraction)}</div>
        </div>
      </div>
    )
  }

  waitTime(attraction){
    if(attraction.waitTime > 0){
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
    const userID = this.state.user.uid
    const userAvatar = this.state.user.photoURL
    const commentID = this.state.comments.length
    let newComment = this.setState({comments: [...this.state.comments, {
        comment,
        userName,
        userAvatar,
        userID,
        commentID
      }]})

    this.comment.value = '';
  }

  deleteButton(comment){
    if(this.state.user.uid === comment.userID){
      return <button className="destroy btn waves-effect waves-light" onClick={this.deleteComment.bind(this, comment)}>X</button>
    }
  }

  deleteComment(comment){
    let leftovers = this.state.comments.filter(object => {
      return comment.commentID !== object.commentID
    })
    this.setState({comments: leftovers})
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
                    <div>{this.deleteButton(comment)}</div>
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
                required
                ref={element => this.comment = element}
              />
              <button className="submitButton btn waves-effect waves-light" type="submit" name="action">Submit
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
            <div onClick={this.login.bind(this)} className="logButton waves-effect waves-light btn">Login to view or leave comments</div>
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
    console.log(this.state.user);
    return(
      <div className="singleAtttraction container">

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
