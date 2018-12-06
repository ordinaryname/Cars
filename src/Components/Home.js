import React, { Component } from 'react';
import Manufacturers from './Manufacturers';
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {showMenu:false,};
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    this.setState({showMenu:true}, ()=> {document.addEventListener('click', this.closeMenu);});
  }

  closeMenu(event) {
    try {
      if (!this.dropdownMenu.contains(event.target)) {
        this.setState({showMenu:false}, ()=> {document.removeEventListener('click', this.closeMenu);});
      }
    } catch(err) {}
  }

  render() {
    return(
      <div>
        <div className="header">
          <Link to="/"><button className="homeButton">Seaweed</button></Link>
          <div className="menuButton"><button className="showManufacturers" onClick={this.showMenu}>Manufacturers</button></div>
        </div>
        {this.state.showMenu?(<div className="menu1" ref={(element) => {this.dropdownMenu = element;}}><Manufacturers/></div>):(null)}
        <div className="imageContainer">
          <img src={require('./images/cars-proj-banner.jpg')} className="bannerImage"/>
          <div className="bannerText">
            <p className="bTextHead">This site was built with ReactJs, PHP & MySql</p>
            <p className="bText">This site was built with ReactJs, PHP & MySql and runs on AWS, Ubuntu, and Apache. It shows my skills at building a website, database, and api.</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
