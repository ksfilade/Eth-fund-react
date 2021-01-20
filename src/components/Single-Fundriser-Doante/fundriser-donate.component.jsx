import React from 'react';
import './fundriser-donate.styles.scss'
import ProgressBar from '../Porgress-Bar/progress-bar.component'
import axios from 'axios'
import DonateModal from '../Donate-Modal/donate-modal.component'
// import { getBallance } from '../../helpers/web3'
class FundriserDonate extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showModal: false,
      title: '',
      walletAddress: '',
      donateTo: '',
      showProgressBar: true,
      widthStyle:{
        width: '0%'
      },
      sum: 0
    }
  }
  async componentDidMount() {
    let data = (await axios.get("http://localhost:3001/fundrisers/donations/"+this.props.data._id));
    this.setState({
      data: data.data.result,
      sum: data.data.sum
    })
    this.state.data.forEach((element, i ,arr) => {
      arr[i].timeSpan = this.calculateTimeSpan( element.dateDonated )
    });
    
  let balance = this.state.sum
  let percent = balance/this.props.data.goalMoney*100;
  this.setState({
    widthStyle: {
      width:percent+'%'
    },
    showProgressBar: true
  })
  }
  calculateTimeSpan = (date) =>{
   return Math.floor( Math.abs( new Date() - new Date( date ) )/1000/60/60 ) 
  }
  openModal = (title, walletAddress, id) => {
    this.setState({
      showModal: true,
      title: title,
      walletAddress: walletAddress,
      donateTo: id
    })
  }
  closeModal = () => {
    this.setState({
      showModal: false,
      title: ''
    })
  }
  render() {
    const elements = []
    if(this.state.data.length >0){
    this.state.data.forEach((element) => {
      elements.push(
        <div className='donate__donators'>
          <div className='donate__donators__image'>
            <img src="https://www.gofundme.com/static/media/DefaultAvatar.65712475de0674c9f775ae3b64e7c69f.svg" alt="" />
          </div>
          <div className='donate__donators__text'>
            <div className='donate__donators__text__name'>
              <h5>{ element.donationFrom} </h5>
            </div>
            <div className='donate__donators__text__amount'>
              <h4>ETH { element.amount  }</h4>
              <h5>{this.calculateTimeSpan( element.dateDonated )} hrs</h5>
            </div>
          </div>
        </div>
      )

    })
  }
    return (
      <div className='donate'>
        <div className='donate__title'>
          <h3>{this.state.sum.toFixed(2)} ETH raised</h3>
          <h4>from {this.props.data.goalMoney}</h4>
        </div>
        <div className='donate__progress'>
          <ProgressBar style={this.state.widthStyle}></ProgressBar>
        </div>
        <button className='donate__button' onClick={this.openModal}>Donate Now</button>
        

        {/* <div className='donate__donators'>
          <div className='donate__donators__image'>
            <img src="https://www.gofundme.com/static/media/DefaultAvatar.65712475de0674c9f775ae3b64e7c69f.svg" alt="" />
          </div>
          <div className='donate__donators__text'>
            <div className='donate__donators__text__name'>
              <h5>Sukirat Singh </h5>
            </div>
            <div className='donate__donators__text__amount'>
              <h4>$100</h4>
              <h5>4 hrs</h5>
            </div>
          </div>

        </div> */}
        <div className = 'donate__all_donators'>
          {elements}
        </div>
        <DonateModal getCommens={ () =>{ this.props.getComments() }} closeModal={this.closeModal} showModal={this.state.showModal} title={this.props.data.title} walletAddress={this.props.data.walletAddress} donateTo = { this.props.data._id }></DonateModal>
      </div>

    )
  }

}
export default FundriserDonate;

