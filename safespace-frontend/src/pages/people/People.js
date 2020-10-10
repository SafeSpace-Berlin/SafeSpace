import React, { Component } from "react";
import "./People.scss";

var config = require("../../config");

export default class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch(config.url + "users", {
      method: "get",
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let users = data.users;
        this.setState({ users: this.state.users.concat(users) });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    return (
      <div id="people">
        {this.state.users &&
          this.state.users.map((r) => (
            <div className="field" key={r._id}>
              <img src={r.photo} alt=""></img>
              <h2>name: {r.name}</h2>
              <h2>id: {r.id}</h2>
              <h2>budget: {r.budget}</h2>
              <h2>story: {r.story}</h2>
              <h2>searches for a room: {r.searching.toString()}</h2>
            </div>
          ))}
      </div>
    );
  }
}
