import React, { Component } from 'react';
import Manufacturers from './Manufacturers';
import { Link } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {showMenu:false, reference:"", query:"undefined", manufacturers:[], manufacturersList:[],};
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.searchFunction = this.searchFunction.bind(this);
  }

  componentDidMount() {
      fetch('https://raymondmutyaba.com/cars-proj/api.php?manufacturer=all', {method:'get'})
      .then(results => {return results.json();})
      .then(data => {
        let manufacturers = Object.values(data).map((company) => {
          return({company}["company"])
        })
        this.setState({manufacturersList: manufacturers});
      })
  }

  updateSearch(event) {
    this.setState({reference:event.target.value});
  }

  searchFunction(event) {
    this.setState({reference:event.target.value});
    var m = [];
    for(var i = 0; i < this.state.manufacturersList.length; i++) {
      if(this.state.manufacturersList[i].toLowerCase().indexOf(this.state.reference.toLowerCase()) > -1) {
        m[m.length] = (<button className="manufacturer">{this.state.manufacturersList[i]}</button>);
      }
    }
    this.setState({manufacturers:m});
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
    return (
      <div className="header">
        <a href="https://raymondmutyaba.com/" className="homeButton">RM</a>
        <ul className="listMenu">
          <li className="menuItem">
            <input type="text" className="search" placeholder="Search for a car ..." value={this.state.reference} onChange={this.updateSearch} onKeyUp={this.searchFunction}/>
            <div className="menu1" ref={(element) => {this.dropdownMenu = element;}}><div className="menu">{this.state.manufacturers}</div></div>
          </li>
          <li className="menuItem">
            <button className="showManufacturers" onClick={this.showMenu}>Manufacturers</button>
            {this.state.showMenu?(<div className="menu1" ref={(element) => {this.dropdownMenu = element;}}><Manufacturers/></div>):(null)}
          </li>
          <Link to="/"><li className="menuItem"><button className="showManufacturers">Cars Project</button></li></Link>
        </ul>
      </div>
    );
  }
}

export default Header;
