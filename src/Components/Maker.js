import React, { Component } from 'react';


import starBorder from './images/star_border.png';

class Maker extends Component {
  constructor(props) {
    super(props);
    this.state = {cars: [], starClass: "unstarred"};
    this.starCar = this.starCar.bind(this);
    this.postStars = this.postStars.bind(this);
    this.carnames = [];
    this.starred = [];
  }

  componentDidMount() {
      const url = "https://raymondmutyaba.com/cars-proj/api.php?manufacturer=" + this.props.maker;
      fetch(url, {method:'get'})
      .then(results => {return results.json();})
      .then(data => {
        let cars = Object.values(data).map((company) => {
          return(<div className="vehicle" key={company}><p className="vehicleText">{company}</p><img src={starBorder} className={this.state.starClass + ' ' + company} onClick={(event) => this.starCar(event, company)} ref={(element) => {this.carnames[company] = element;}} alt="Click this star to favorite or unfavorite this vehicle" /></div>)
        })
        this.setState({cars: cars});
      })
  }

  postStars(data) {
    const url = "https://raymondmutyaba.com/cars-proj/api.php";
    fetch(url, {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(data)});
    console.log(JSON.stringify(data));
  }

  starCar(event, company) {
    //this.setState((state) => {starred[company]: !state.starred[company]});
    if(this.starred[company] === null || this.starred[company] === ''){
      this.starred[company] = false;
    }
    if(this.starred[company]){
      this.carnames[company].classList.add("unstarred");
      this.carnames[company].classList.remove("starred");
      this.postStars({maker: this.props.maker, vehicle: company, star: 'minus'});
    } else {
      this.carnames[company].classList.add("starred");
      this.carnames[company].classList.remove("unstarred");
      this.postStars({maker: this.props.maker, vehicle: company, star: 'plus'});
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
