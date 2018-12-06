import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Error from './Error';
import Maker from './Maker';

class Manufacturer extends Component {

  constructor() {
    super();
    this.state = {
      manufacturers: [],
    };
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
  }

  render() {
    const { params } = this.props.match;
    return(
      <div>
        <div className="header">
          <Link to="/"><button className="homeButton">Seaweed</button></Link>
        </div>
        {this.state.manufacturers.includes(params.manufacturer)?(<Maker maker={params.manufacturer}/>):(<Error />)}
      </div>
    );
  }
}

export default Manufacturer;
