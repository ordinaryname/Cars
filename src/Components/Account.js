import React, { Component } from 'react';
import Header from './Header';

import defaultUserImage  from './images/account_box.png';

class Account extends Component {
  constructor() {
    super();
    this.state = {manufacturers: [], cars: []};
    this.getStars = this.getStars.bind(this);
  }

  componentDidMount() {
      fetch('https://raymondmutyaba.com/cars-proj/api.php?manufacturer=all', {method:'get'})
      .then(results => {return results.json();})
      .then(data => {
        let manufacturers = Object.values(data).map((company) => {
          return({company}["company"])
        })
        this.setState({manufacturers: manufacturers});
      })
      this.getStars();
  }

  getStars() {
    fetch('https://raymondmutyaba.com/cars-proj/api.php?user=starred_vehicles', {method:'get'})
    .then(results => {return results.json();})
    .then(data => {
      let cars = Object.values(data).map((vehicle) => {
        return(<li className="starred_vehicle">{vehicle}</li>)
      })
      this.setState({cars: cars});
    })
  }

  render() {
    return(
      <div>
        <Header/>
        <div className="accountBody">
          <img src={defaultUserImage} className="userImage" alt="User"/>
          <h1 className="usernameText">Welcome Guest</h1>
          <div className="starred_vehicles">
            <h2 className="starred_vehicleTitle">Your Starred Vehicles</h2>
            <ul>
              {this.state.cars}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
