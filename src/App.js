import  React from 'react';
import './App.css';

import { Route,Switch } from 'react-router-dom';
import 'typeface-roboto';
import HomePage from './pages/home-page/home-page'
import BrowseFundrisers from './pages/browse-fundrisers/browse-fundrisers'
import Fundriser from './pages/fundriser/fundriser'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      monsters: [
       
      ],
      search:''
    }
  }
  
  

  render() {
    
  return (
    <div className="App">      
      <div>
      </div>
      <Switch>
        <Route exact path='/' component = { HomePage } />
      </Switch>
      <Switch>
        <Route exact path='/browse' component = { BrowseFundrisers } />
      </Switch>
      <Switch>
        <Route exact path='/fundriser' component = { Fundriser } />
      </Switch>
    </div>
  );
}
}

export default App;