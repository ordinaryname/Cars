import React, { Component } from 'react';
import Header from './Header';

import bannerImage from './images/cars-proj-banner.jpg';

class Home extends Component {

  render() {
    return(
      <div>
        <Header/>
        <div className="imageContainer">
          <img src={bannerImage} className="bannerImage" alt="Chevy and Porsche Racecars"/>
          <div className="bannerText">
            <p className="bTextHead">This site was built with ReactJs, PHP & MySql</p>
            <p className="bText">This site was built with ReactJs, PHP & MySql and runs on AWS, Ubuntu, and Apache. It shows my skills at building a website, database, and api.</p>
          </div>
        </div>
        <div className="languagesContainer">
          <ul className="listOLanguages">
            <li className="language"><p className="languageText">React JS</p></li>
            <li className="language"><p className="languageText">Javascript</p></li>
            <li className="language"><p className="languageText">PHP</p></li>
            <li className="language"><p className="languageText">MySql</p></li>
          </ul>
        </div>
      </div>
    );
  }

}

export default Home;
