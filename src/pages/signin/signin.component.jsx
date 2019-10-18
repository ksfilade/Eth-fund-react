import React from 'react'
import './signin.styles.scss';

const Signin = () =>(
    <div className = 'signin'>
        <div className = 'signin__box'>
            <h3 className = 'signin__box__label'>Username</h3>
            <input className = 'signin__box__input' type="text"/>
            <h3 className = 'signin__box__label'>Password</h3>
            <input className ='signin__box__input' type="text"/>
            <div className = 'signin__box__button'>
                <button>login</button>
            </div>
        </div>
    </div>
)
export default Signin