import React from 'react'
import './createFundriser.styles.scss';
import axios from 'axios'
class  Signup extends React.Component {
    constructor(){
        super();  
        this.state = {
                city: '',
                country: '',
                title: '',
                description: '',
                goalMoney: '',
                thumbnail:''
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
      onChangeHandler=event=>{

        this.setState({
            thumbnail: event.target.files[0]
        }) 
    
    }
      submitHandler = () => {
        let fundriser = this.state;
        // delete user.repatPassword;
        console.log(this.state.thumbnail);
        const data = new FormData()
        data.append('upload', this.state.thumbnail)
        data.append('city', this.state.city)
        data.append('country', this.state.country)
        data.append('title', this.state.title)
        data.append('description', this.state.description)
        data.append('goalMoney', this.state.goalMoney)
        console.log(data);
    //     delete user.token
        axios.post('https://enigmatic-fortress-52205.herokuapp.com/fundrisers', data,{headers: { 'Content-Type': 'application/json'}})
        .then(res => {
            console.log(res.data);
            this.setState({
                token: res.data.token
            })
            console.log(this.state.token);
      })
    }

    render () {
        return(

        <div className = 'signup'>
            <div className = 'signup__box'>
                <h3 className = 'signup__box__label' >city</h3>
                <input className = 'signup__box__input' type="text" value={this.state.city}  onChange={this.setField.bind(null, 'city')}/>
                <h3 className = 'signup__box__label'>country</h3>
                <input className ='signup__box__input' type="text" value={this.state.country}  onChange={this.setField.bind(null, 'country')}/>
                <h3 className = 'signup__box__label'>title</h3>
                <input className ='signup__box__input' type="text" value={this.state.title}  onChange={this.setField.bind(null, 'title')}/>
                <h3 className = 'signup__box__label'>description</h3>
                <input className ='signup__box__input' type="text" value={this.state.description}  onChange={this.setField.bind(null, 'description')}/>
                <h3 className = 'signup__box__label'>goalMoney</h3>
                <input className ='signup__box__input' type="text" value={this.state.goalMoney}  onChange={this.setField.bind(null, 'goalMoney')}/>
                <h3 className = 'signup__box__label'>thumbnail</h3>
                <input className ='signup__box__input' type="file"   onChange={this.onChangeHandler}/>
               
                <div className = 'signup__box__button'>
                    <button onClick={this.submitHandler}>create</button>
                </div>
            </div>
        </div>
        )
    }
}
export default Signup