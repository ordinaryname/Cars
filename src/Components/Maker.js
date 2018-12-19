import React, { Component } from 'react';


import starImage from './images/star_border.png';

class Maker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
    };
  }

  componentDidMount() {
      const url = "https://raymondmutyaba.com/cars-proj/api.php?manufacturer=" + this.props.maker;
      fetch(url, {method:'get'})
      .then(results => {return results.json();})
      .then(data => {
        let cars = Object.values(data).map((company) => {
          return(<div className="vehicle"><p className="vehicleText">{company}</p><div className="star"></div></div>)
        })
        this.setState({cars: cars});
      })
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
          <p className="footerText">&#169;Raymond Mutyaba</p>
        </div>
      </div>
    );
  }
}

export default Maker;
