import React from 'react'
import './signup.styles.scss';
import axios from 'axios'
import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/user.actions'
class  Signup extends React.Component {
    constructor(){
        super();  
        this.state = {
                email: '',
                password: '',
                repatPassword: '',
                firstName: '',
                lastName: '',
                token:''
        }; 
        this.setField = this.setField.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }
    
    setField(field, e) {
        this.setState({
          [field]: e.target.value
        })
        console.log(this.state);
      }
      submitHandler = () => {
        let user = this.state;
        // delete user.repatPassword;
        delete user.token
        axios.post('https://enigmatic-fortress-52205.herokuapp.com/users', user,{headers: { 'Content-Type': 'application/json'}})
        .then(res => {
            console.log(res.data);
            this.props.setCurrentUser({ name: res.data.user.email, isLogedin: true, token: res.data.token })
        })
    }

    render () {
        return(

        <div className = 'signup'>
            <div className = 'signup__box'>
                <h3 className = 'signup__box__label' >Email</h3>
                <input className = 'signup__box__input' type="text" value={this.state.email}  onChange={this.setField.bind(null, 'email')}/>
                <h3 className = 'signup__box__label'>Password</h3>
                <input className ='signup__box__input' type="password" value={this.state.password}  onChange={this.setField.bind(null, 'password')}/>
                <h3 className = 'signup__box__label'>Repeat Password</h3>
                <input className ='signup__box__input' type="password" value={this.state.repatPassword}  onChange={this.setField.bind(null, 'repatPassword')}/>
                <h3 className = 'signup__box__label'>First Name</h3>
                <input className ='signup__box__input' type="text" value={this.state.firstName}  onChange={this.setField.bind(null, 'firstName')}/>
                <h3 className = 'signup__box__label'>Last Name</h3>
                <input className ='signup__box__input' type="text" value={this.state.lastName}  onChange={this.setField.bind(null, 'lastName')}/>
                <div className = 'signup__box__button'>
                    <button onClick={this.submitHandler}>login</button>
                </div>
            </div>
        </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect (null, mapDispatchToProps) (Signup)