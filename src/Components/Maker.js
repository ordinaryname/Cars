import React, { Component } from 'react';


import starBorder from './images/star_border.png';

class Maker extends Component {
  constructor(props) {
    super(props);
    this.state = {cars: [], starClass: "unstarred", stars: [],};
    this.starCar = this.starCar.bind(this);
    this.postStars = this.postStars.bind(this);
    this.getStars = this.getStars.bind(this);
    this.getVehicles = this.getVehicles.bind(this);
    this.carnames = [];
    this.starred = [];
  }

  componentDidMount() {
    this.getStars();
  }

  getVehicles() {
    const url = "https://raymondmutyaba.com/cars-proj/api.php?manufacturer=" + this.props.maker;
    fetch(url, {method:'get'})
    .then(results => {return results.json();})
    .then(data => {
      let cars = Object.values(data).map((company) => {
        this.state.stars.includes(`${this.props.maker} ${company}`)?(this.starred[company] = true):(this.starred[company] = false)
        return(<div className="vehicle" key={company}><p className="vehicleText">{company}</p><img src={starBorder} className={this.state.stars.includes(`${this.props.maker} ${company}`)?("starred"):("unstarred")} onClick={(event) => this.starCar(event, company)} ref={(element) => {this.carnames[company] = element;}} alt="Click this star to favorite or unfavorite this vehicle" /></div>)
      })
      this.setState({cars: cars});
    })
  }

  getStars() {
    fetch('https://raymondmutyaba.com/cars-proj/api.php?user=starred_vehicles', {method:'get'})
    .then(results => {return results.json();})
    .then(data => {
      let stars = Object.values(data).map((vehicle) => {
        return({vehicle}["vehicle"])
      })
      this.setState({stars: stars});
    })
    this.getVehicles();
  }

  postStars(data) {
    const url = "https://raymondmutyaba.com/cars-proj/api.php";
    fetch(url, {method: 'POST', credentials: "include", redirect: 'follow', headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}), body: data});
  }

  starCar(event, company) {
    if(this.starred[company] === null || this.starred[company] === ''){
      this.starred[company] = false;
    }
    if(this.starred[company]){
      this.carnames[company].classList.add("unstarred");
      this.carnames[company].classList.remove("starred");
      this.postStars(`maker=${this.props.maker}&vehicle=${company}&star=minus`);
    } else {
      this.carnames[company].classList.add("starred");
      this.carnames[company].classList.remove("unstarred");
      this.postStars(`maker=${this.props.maker}&vehicle=${company}&star=plus`);
    }
    this.starred[company] = !this.starred[company];
    console.log(this.starred[company], company, this.carnames[company]);
  }

  render() {
    return(
      <div>
        <div className="content">
          <img className="logo" alt="" src="" />
          <p className="title">{this.props.maker}</p>
          <div className="borderBottom"></div>
          <div className="vehicles">{this.state.cars}</div>
        </div>
        <div className="footer">
          <p className="footerText">&#169;Raymond Mutyaba 2019</p>
        </div>
      </div>
    );
  }
}

export default Maker;
