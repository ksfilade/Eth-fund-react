import  React from 'react';
import './App.css';

import { Route,Switch } from 'react-router-dom';
import 'typeface-roboto';
import HomePage from './pages/Home-Page/home-page'
import BrowseFundrisers from './pages/Browse-Fundrisers/browse-fundrisers'
import Fundriser from './pages/Single-Fundriser/fundriser'
import Navbar from './components/Navbar/navbar.component'
import Signin from './pages/Sign-In/signin.component'
import Signup from './pages/Sign-Up/signup.component'
import CreateFundriser from './pages/Create-Fundrisers/createFundriser.component'
import UserFundrisers from './pages/User-Fundrisers/user-fundrisers'
import editFundriser from './pages/Edit-Fundrisers/editFundriser.component'
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
        <Route exact path='/user-fundrisers' component = { UserFundrisers } />
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
      <Switch>
        <Route exact path='/edit-fundrisers/:id' component = { editFundriser } />
      </Switch>
    </div>
  );
}
}
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);