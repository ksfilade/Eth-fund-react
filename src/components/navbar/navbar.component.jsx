import React from 'react';
import './navbar.style.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios'
import { setCurrentUser, logoutUser } from '../../redux/user/user.actions'

class Navbar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: props.currentUser,
      isLogedin: props.isLogedin,
      token: props.token
    };

  }

  async logOut() {
    let res = await axios.post('https://enigmatic-fortress-52205.herokuapp.com/users/logout', null,
      {
        headers: { 'Content-Type': 'application/json', 'token': this.props.token }
      })
      let { data } = res
      if (data.success)
       this.props.logoutUser()

  }
  render() {
    return (
      <div className='navbar'>
        <div className="navbar__discover">
          <Link to={'/browse'} className='navbar__link'>
            <h1>Discover</h1>
          </Link>
        </div>
        <div className="navbar__category">
          <h1>Category</h1>
        </div>
        <div className="navbar__title">
          <Link to={'/'} className='navbar__link'>
            <h1>goFundMe</h1>
          </Link>
        </div>
        {!this.props.isLogedin &&
          <div className="navbar__register">
            <Link to={'/register'} className='navbar__link'>
              <h1>register</h1>
            </Link>
          </div>
        }
        {!this.props.isLogedin &&
          <div className="navbar__login">
            <Link to={'/login'} className='navbar__link'>
              <h1>login</h1>
            </Link>
          </div>
        }
        {this.props.isLogedin &&
          <div className="navbar__loged_user">
            <h3>hello ksfialde@yahoo.com</h3>
          </div>
        }
        {this.props.isLogedin &&
          <div className="navbar__login" onClick={this.logOut.bind(this, 2)}>
            <h1>log out</h1>
          </div>
        }

        <div className="navbar__start">
          <Link to={'/createFundriser'} className='navbar__link'>
            <h1>start</h1>
          </Link>
        </div>
      </div>
    )
  }

}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  isLogedin: state.user.isLogedin,
  token: state.user.token
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  logoutUser: () => dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

