import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Manufacturers extends Component {
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
          return(<Link to={("/" + {company}["company"])}><button className="manufacturer">{company}</button></Link>)
        })
        this.setState({manufacturers: manufacturers});
      })
  }

  render() {
    return (
      <div className="menu">
        {this.state.manufacturers}
      </div>
    );
  }
}

export default Manufacturers;
