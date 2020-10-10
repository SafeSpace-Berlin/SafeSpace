import React, { Component } from "react";
import "./Person.scss";

var config = require("../../config");

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(config.url + "users/" + id, {
      method: "get",
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let user = data.user;
        this.setState({ user: user });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    let user = this.state.user;
    return (
      <div id="person">
        {user && (
          <div className="field" key={user._id}>
            <img src={user.photo} alt=""></img>
            <h2>name: {user.name}</h2>
            <h2>id: {user.id}</h2>
            <h2>budget: {user.budget}</h2>
            <h2>story: {user.story}</h2>
            <h2>searches for a room: {user.searching.toString()}</h2>
          </div>
        )}
      </div>
    );
  }
}
