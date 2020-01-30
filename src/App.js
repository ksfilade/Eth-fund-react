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
import { setSingleFundriser } from './redux/fundrisers/fundrisers.actions'
import SnackBar from './components/Snackbar/snackbar.component'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donationFrom: '',
      amount: '',
      showSnackBar: false,
    }
  }
  componentDidMount() {
    
    // const { endpoint } = this.state;
    const socket = socketIOClient('https://enigmatic-fortress-52205.herokuapp.com');
    socket.on('countupdatednetwork', (obj)=>{
      let updatedItem = this.props.fundrisers.find(el => el.data._id == obj.toId)
      updatedItem.balance += parseInt( obj._value ) /Math.pow(10,18);
      this.props.setSingleFundriser( updatedItem )
      let items = this.props.fundrisers.filter(el => el.data.createdBy == this.props.userID)
      let singleItem = items.find(el => el.data._id == obj.toId)
      if(items.find(el => el.data._id == obj.toId)){
        let newBalance = parseInt( obj._value ) /Math.pow(10,18);
        // singleItem.balance += newBalance
        this.setState({
          showSnackBar: true,
          donationFrom: 'from '+obj.fromId,
          amount: obj._value/Math.pow(10,18)
        })
      }
      setTimeout(() =>{
        this.setState({
          showSnackBar: false
        })
      },3000)
     })  
  }

  render() {
    
  return (
    <div className="App">      
      <div>
        <Navbar></Navbar>
      </div>
      {this.state.showSnackBar && <SnackBar donationFrom={this.state.donationFrom} amount={this.state.amount}></SnackBar>}
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
const mapStateToProps = state => ({
  userID: state.user.userID,
  currentUser: state.user.currentUser,
  isLogedin: state.user.isLogedin,
  token: state.user.token,
  fundrisers: state.fundriser.fundrisers
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setSingleFundriser: fundriser => dispatch(setSingleFundriser(fundriser))
});


export default connect(mapStateToProps,mapDispatchToProps)(App);