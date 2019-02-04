import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './Components/Home';
import About from './Components/About';
import Account from './Components/Account';
import Error from './Components/Error';
import Manufacturer from './Components/Manufacturer';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter basename={"/cars-project"}>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About}/>
            <Route path="/account" component={Account}/>
            <Route path="/:manufacturer" component={Manufacturer}/>
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
