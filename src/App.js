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
import CreateFundriser from './pages/createFundriser/createFundriser.component'
import socketIOClient from 'socket.io-client'
import { connect } from 'react-redux'
import { setCurrentUser} from './redux/user/user.actions'
class App extends React.Component {
  // componentDidMount() {
 
  //  this.props.setCurrentUser({name:'kire'})
  // }
  componentDidMount() {
    // const { endpoint } = this.state;
    const socket = socketIOClient('https://enigmatic-fortress-52205.herokuapp.com');
    socket.on('countupdatednetwork', (obj)=>{
      console.log('cont updated network');
      console.log(obj);
     })
  
    // socket.on("FromAPI", data => this.setState({ response: data }));
  }

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
        <Route exact path='/fundrisers/:id' component = { Fundriser } />
      </Switch>
      <Switch>
        <Route exact path='/login' component = { Signin } />
      </Switch>
      <Switch>
        <Route exact path='/register' component = { Signup } />
      </Switch>
      <Switch>
        <Route exact path='/createfundriser' component = { CreateFundriser } />
      </Switch>
    </div>
  );
}
}
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);