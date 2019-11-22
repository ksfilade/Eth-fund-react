import React from 'react'
import './createFundriser.styles.scss';
import axios from 'axios'
class startfundriser extends React.Component {
    constructor() {
        super();
        this.state = {
            city: '',
            country: '',
            title: '',
            description: '',
            goalMoney: '',
            thumbnail: ''
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
    onChangeHandler = event => {

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
        axios.post('https://enigmatic-fortress-52205.herokuapp.com/fundrisers', data, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                console.log(res.data);
                this.setState({
                    token: res.data.token
                })
                console.log(this.state.token);
            })
    }

    render() {
        return (

            <div className='startfundriser'>
                <div className='startfundriser__box'>
                    <div className='startfundriser__box__title'>
                        <h1>Start Fundrise</h1>
                    </div>
                    <div className='startfundriser__box__credentials'>
                        <input className='startfundriser__box__credentials__input' placeholder='City' type="text" value={this.state.city} onChange={this.setField.bind(null, 'city')} />
                        <input className='startfundriser__box__credentials__input' placeholder='Country' type="text" value={this.state.country} onChange={this.setField.bind(null, 'country')} />
                        <input className='startfundriser__box__credentials__input' placeholder='Title' type="text" value={this.state.title} onChange={this.setField.bind(null, 'title')} />
                        <input className='startfundriser__box__credentials__input' placeholder='Description' type="text" value={this.state.description} onChange={this.setField.bind(null, 'description')} />
                        <input className='startfundriser__box__credentials__input' placeholder='Goal Money' type="text" value={this.state.goalMoney} onChange={this.setField.bind(null, 'goalMoney')} />
                        {/* <input className='startfundriser__box__credentials__upload' type="file" onChange={this.onChangeHandler} /> */}
                        <div className="box">
                            <input type="file" name="file-1[]" id="file-1" class="inputfile inputfile-1" data-multiple-caption="{count} files selected" multiple />
                            <label className = 'margin'for="file-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> <span>Choose a file&hellip;</span></label>
                        </div>
                    </div>
                    <div className='startfundriser__box__button'>

                        <div className='startfundriser__box__button__startfundriser' onClick={this.submitHandler}>
                            <h3>Start Fundriser</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default startfundriser