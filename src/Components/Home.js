import React, { Component } from 'react';
import Header from './Header';

class Home extends Component {

  render() {
    return(
      <div>
        <Header/>
        <div className="imageContainer">
          <img src={require('./images/cars-proj-banner.jpg')} className="bannerImage" alt="Chevy and Porsche Racecars"/>
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
