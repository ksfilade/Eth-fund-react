import  React from 'react';
import './App.css';

import { Route,Switch } from 'react-router-dom';
import 'typeface-roboto';
import HomePage from './pages/home-page/home-page'
import BrowseFundrisers from './pages/browse-fundrisers/browse-fundrisers'
import Fundriser from './pages/fundriser/fundriser'
import Navbar from './components/navbar/navbar.component'
import Signin from './pages/signin/signin.component'
import Signup from './pages/signup/signup.component'
import { connect } from 'react-redux'
import { setCurrentUser} from './redux/user/user.actions'
class App extends React.Component {
  // componentDidMount() {
 
  //  this.props.setCurrentUser({name:'kire'})
  // }
  

  render() {
    
  return (
    <div className="App">      
      <div>
        <Navbar></Navbar>
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
      <Switch>
        <Route exact path='/login' component = { Signin } />
      </Switch>
      <Switch>
        <Route exact path='/register' component = { Signup } />
      </Switch>
    </div>
  );
}
}
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);