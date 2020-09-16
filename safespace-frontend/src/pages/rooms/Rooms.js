import React, { Component } from "react";
import "./Rooms.scss";

var config = require("../../config");

export default class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    fetch(config.url + "rooms", {
      method: "get",
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let rooms = data.rooms;
        this.setState({ rooms: this.state.rooms.concat(rooms) });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    return (
      <div id="rooms">
        {this.state.rooms &&
          this.state.rooms.map((r) => (
            <div className="field" key={r._id}>
              <img src={r.photo} alt=""></img>
              <h2>availableFrom: {r.availableFrom}</h2>
              <h2>availableTo: {r.availableTo}</h2>
              <h2>city: {r.city}</h2>
              <h2>country: {r.country}</h2>
              <h2>district: {r.district}</h2>
              <h2>price: {r.price}</h2>
            </div>
          ))}
      </div>
    );
  }
}
