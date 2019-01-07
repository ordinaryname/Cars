import React, { Component } from 'react';
import Manufacturers from './Manufacturers';
import { Link } from "react-router-dom";

import accountIcon from './images/account_box.png';

class Header extends Component {
  constructor() {
    super();
    this.state = {showMenu:false, showAccountMenu:false, reference:"", query:"undefined", manufacturers:[], manufacturersList:[],};
    this.showAccountMenu = this.showAccountMenu.bind(this);
    this.closeAccountMenu = this.closeAccountMenu.bind(this);
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
    this.setState({showMenu:true}, ()=> {document.addEventListener('click', this.closeMenu);});
  }

  searchFunction(event) {
    this.setState({reference:event.target.value});
    var m = [];
    for(var i = 0; i < this.state.manufacturersList.length; i++) {
      if(this.state.manufacturersList[i].toLowerCase().indexOf(this.state.reference.toLowerCase()) > -1) {
        m[m.length] = (<Link to={("/" + this.state.manufacturersList[i])}><button className="manufacturer">{this.state.manufacturersList[i]}</button></Link>);
      }
    }
    this.setState({manufacturers:m});
  }

  showAccountMenu(event) {
    event.preventDefault();
    this.setState({showAccountMenu:true}, ()=> {document.addEventListener('click', this.closeAccountMenu);});
  }

  closeAccountMenu(event) {
    try {
      if (!this.dropdownMenu1.contains(event.target)) {
        this.setState({showAccountMenu:false}, ()=> {document.removeEventListener('click', this.closeAccountMenu);});
      }
    } catch(err) {}
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
            <img src={accountIcon} className="accountIcon" alt="Account Icon" onClick={this.showAccountMenu}/>
            {this.state.showAccountMenu?(
              <div className="accountMenu" ref={(element) => {this.dropdownMenu1 = element;}}>
                <button className="manufacturer">Account</button>
                <button className="manufacturer">Log Out</button>
              </div>
            ):(null)}
          </li>
          <li className="menuItem">
            <input type="text" className="search" placeholder="Search for a car ..." value={this.state.reference} onChange={this.updateSearch} onKeyUp={this.searchFunction}/>
            {this.state.showMenu?(<div className="menu1" ref={(element) => {this.dropdownMenu = element;}}>{this.state.manufacturers}</div>):(null)}
          </li>
          <Link to="/"><li className="menuItem"><button className="showManufacturers">Cars Project</button></li></Link>
        </ul>
      </div>
    );
  }
}

export default Header;
