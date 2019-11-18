import React from 'react'
import './signin.styles.scss';
import axios from 'axios';
import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/user.actions'

class Signin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            user: props.currentUser,
            isLogedin: props.isLogedin,
            token: props.token
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
        console.log(this.props);
        axios.post('https://enigmatic-fortress-52205.herokuapp.com/users/login', user)
            .then(res => {
                this.props.setCurrentUser({ name: res.data.user.email, isLogedin: true, token: res.data.token })
                
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