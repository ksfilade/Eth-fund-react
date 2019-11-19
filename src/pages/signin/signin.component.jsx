import React from 'react'
import './signin.styles.scss';
import axios from 'axios';
import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/user.actions'
import { async } from 'q';

class Signin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            user: props.currentUser,
            isLogedin: props.isLogedin,
            token: props.token,
            wrondCredentials: false
        };
        this.setField = this.setField.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    setField(field, e) {
        this.setState({
            [field]: e.target.value
        })
    }
    submitHandler = async() => {
        let { email, password } = this.state;
        // delete user.repatPassword;
        let res = await axios.post('https://enigmatic-fortress-52205.herokuapp.com/users/login', {email, password}).catch(() =>{
            console.log('error');
        })
        if(res.data.success == undefined){
            this.props.setCurrentUser({ name: res.data.user.email, isLogedin: true, token: res.data.token })
            this.props.history.push('/')
        }
        else
            this.setState({
                wrondCredentials: true
            })
          
    }
    render() {
        return (
            <div className='signin'>
                <div className='signin__box'>
                    <h3 className='signup__box__label' >email</h3>
                    <input className='signup__box__input' type="text" value={this.state.email} onChange={this.setField.bind(null, 'email')} />
                    <h3 className='signup__box__label'>Password</h3>
                    <input className='signup__box__input' type="password" value={this.state.password} onChange={this.setField.bind(null, 'password')} />
                    {this.state.wrondCredentials && <p className='signin__box__wrong_credentials'>wrong credentials</p> }
                    <div className='signin__box__button'>
                        
                        <button onClick={this.submitHandler}>login</button>
                    </div>
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
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin)