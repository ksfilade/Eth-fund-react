import React from 'react'
import './editFundriser.styles.scss';
import axios from 'axios'
import { checkAddress } from '../../helpers/web3'
import { checkIfEmpty } from '../../helpers/checkFunctions'
import Spiner from '../../components/Spinner/spiner.component'
import ErrorMessage from '../../components/Error-Message/error-message.component'
import { connect } from 'react-redux'
import { element } from 'prop-types';

class editfundriser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            country: '',
            title: '',
            description: '',
            goalMoney: '',
            thumbnail: '',
            walletAddress: '',
            showSpiner: false,
            showErrorMessage: false,
            errorMessage: '',
            showCategoryDropDown: false,
            categoryText: 'Category',
            organaiser: '',
            categories: ['Medical', 'Memorial', 'Nonprofit', 'Animals', 'Education', 'Sports', 'Other'],
            useCredentials: false,
            disableUpdateButton: false
        };
        this.setField = this.setField.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }
    async componentDidMount(){
        let res = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers/'+this.props.match.params.id)
        const item = res.data[0]
        console.log(item);
        this.setState({
            city: item.city,
            country: item.country,
            title: item.title,
            description: item.description,
            goalMoney: item.goalMoney,
            organaiser: item.organaiser,
            categoryText: item.category,
            walletAddress: item.walletAddress
        })

    }
    setField(field, e) {
        this.setState({
            [field]: e.target.value
        })
        // console.log(this.state);
    }
    onChangeHandler = event => {
        this.setState({
            thumbnail: event.target.files[0]
        })
    }
    clickedCategoy = () => {
        this.setState({
            showCategoryDropDown: !this.state.showCategoryDropDown,
        })
    }
    selectedCategory = (item) => {
        this.setState({
            showCategoryDropDown: !this.state.showCategoryDropDown,
            categoryText: item
        })
    }
    clickedUseCredentials = () => {
        this.setState({
           useCredentials: !this.state.useCredentials,
           organaiser: !this.state.useCredentials ? this.props.currentUser : ''
        })
     }
    submitHandler = async () => {
        console.log(this.state.goalMoney);
        console.log(await this.makeChecks());
        if(! await this.makeChecks())
            return
        console.log('=============')
        console.log(this.makeChecks());
        const data = {
            category: this.state.categoryText,
            city: this.state.city,
            country: this.state.country,
            title: this.state.title,
            description: this.state.description,
            goalMoney: this.state.goalMoney,
            walletAddress: this.state.walletAddress,
            organaiser: this.state.organaiser
        }
        // data.append('upload', this.state.thumbnail)
        // data.append('category', this.state.categoryText)
        // data.append('city', this.state.city)
        // data.append('country', this.state.country)
        // data.append('title', this.state.title)
        // data.append('description', this.state.description)
        // data.append('goalMoney', this.state.goalMoney)
        // data.append('walletAddress', this.state.walletAddress)
        // data.append('organaiser', this.state.organaiser)
        this.setState({
            showSpiner: true
        })
        axios.put('https://enigmatic-fortress-52205.herokuapp.com/fundrisers/user/'+this.props.id+'/edit/'+this.props.match.params.id, data, { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
            .then(res => {
                console.log(res);
                this.setState({
                    showSpiner: false,
                    disableUpdateButton: true
                })
                // this.props.history.push('/fundrisers/'+res.data.fundriser._id)
            })
    }
   makeChecks = async () => {
    if (!checkIfEmpty(this.state.walletAddress) || !checkIfEmpty(this.state.goalMoney) || !checkIfEmpty(this.state.title) || !checkIfEmpty(this.state.organaiser)) {
         this.setState({
            showErrorMessage: true,
            errorMessage: 'Title,Organaiser Wallet Address and Goal Money are mandatory fields'
        })
        return false
    }
    if (!await checkAddress(this.state.walletAddress)){
         this.setState({
            showErrorMessage: true,
            errorMessage: 'Not Valid Wallet Address'
        })
        return false
    }
    if (this.state.categoryText === 'Category'){
         this.setState({
            showErrorMessage: true,
            errorMessage: 'Select Category'
        })
        return false
   }
   return true
}

    render() {
        const elements = this.state.categories.map((item, index) => (
            <div key={index} className='startfundriser__box__credentials__select_category__items__item' onClick={() => { this.selectedCategory(item) }}>
                <p>{item}</p>
            </div>
        ))
        return (

            <div className='startfundriser'>
                <div className='startfundriser__box'>
                    <div className='startfundriser__box__title'>
                        <h1>Edit Fundrise</h1>
                    </div>
                    <div className='startfundriser__box__credentials'>
                        <form>
                            <input className='startfundriser__box__credentials__input' placeholder='City' type="text" value={this.state.city} onChange={this.setField.bind(null, 'city')} />
                            <input className='startfundriser__box__credentials__input' placeholder='Country' type="text" value={this.state.country} onChange={this.setField.bind(null, 'country')} />
                            <input className='startfundriser__box__credentials__input' placeholder='Title' type="text" value={this.state.title} onChange={this.setField.bind(null, 'title')} />
                            <input className='startfundriser__box__credentials__input' placeholder='organaiser' type="text" value={this.state.organaiser} onChange={this.setField.bind(null, 'organaiser')} />
                            <div className='startfundriser__box__credentials__checkbox'>
                                <div className='startfundriser__box__credentials__checkbox__value' onClick={this.clickedUseCredentials}>
                                    {this.state.useCredentials && <img src="https://www.goglobie.com/wp-content/uploads/2018/03/check-image.png" alt="" />}
                                </div>
                                <div className='startfundriser__box__credentials__checkbox__text'>
                                    <h5>Use First and Last Name</h5>
                                </div>
                            </div>
                            <div className='startfundriser__box__credentials__selected_category' onClick={this.clickedCategoy}>
                                <p> {this.state.categoryText}</p>
                            </div>
                            {this.state.showCategoryDropDown && <div className='startfundriser__box__credentials__select_category'>
                                <div className='search__select_category__items'>
                                    {elements}
                                </div>
                            </div>}
                            <textarea rows="4" cols="50" placeholder='Description' type="text" value={this.state.description} onChange={this.setField.bind(null, 'description')} />
                            <input className='startfundriser__box__credentials__input' placeholder='Goal Money' type="text" value={this.state.goalMoney} onChange={this.setField.bind(null, 'goalMoney')} />
                            <input className='startfundriser__box__credentials__input' placeholder='Wallet Address' type="text" value={this.state.walletAddress} onChange={this.setField.bind(null, 'walletAddress')} />

                            {/* <input className='startfundriser__box__credentials__upload' type="file" onChange={this.onChangeHandler} /> */}
                            <div className="box">
                                <input type="file" name="file-1[]" id="file-1" className="inputfile inputfile-1" onChange={this.onChangeHandler} data-multiple-caption="{count} files selected" multiple />
                                <label className='margin' htmlFor="file-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> <span>Choose a file&hellip;</span></label>
                            </div>

                        </form>
                    </div>

                    {this.state.showErrorMessage && <ErrorMessage message={this.state.errorMessage}></ErrorMessage>}

                    <div className='startfundriser__box__button'>

                        {!this.state.disableUpdateButton && <div className='startfundriser__box__button__startfundriser' onClick={this.submitHandler}>
                            {!this.state.showSpiner && <h3>Start Fundriser</h3>}
                            {this.state.showSpiner && <Spiner color='#4CAF50' size='30' background='white'></Spiner>}
                        </div>}
                        {this.state.disableUpdateButton && <div className='startfundriser__box__button__startfundriser not-active' >
                            {!this.state.showSpiner && <h3>Succesfull Upadte</h3>}
                            {this.state.showSpiner && <Spiner color='#4CAF50' size='30' background='white'></Spiner>}
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    isLogedin: state.user.isLogedin,
    token: state.user.token,
    id: state.user.userID
});
export default connect(mapStateToProps, null)(editfundriser)