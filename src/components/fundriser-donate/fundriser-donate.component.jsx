import React from 'react';
import './fundriser-donate.styles.scss'
import ProgressBar from '../progress-bar/progress-bar.component'
import axios from 'axios'
import { ifStatement } from '@babel/types';
class FundriserDonate extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  async componentDidMount() {
    
    this.setState({
      data: (await axios.get("https://enigmatic-fortress-52205.herokuapp.com/fundrisers/donations/0x99F08ae81782DC764B94f7458A5ccE27b00B32Ec")).data
    })
    console.log(this.state.data);
    this.state.data.forEach((element, i ,arr) => {
      arr[i].timeSpan = this.calculateTimeSpan( element.dateDonated )
    });
  
  }
  calculateTimeSpan = (date) =>{
   return Math.floor( Math.abs( new Date() - new Date( date ) )/1000/60/60 ) 
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
              <h4>ETH { element.amount }</h4>
              <h5>{this.calculateTimeSpan( element.dateDonated )} hrs</h5>
            </div>
          </div>
        </div>
      )

    })}
    return (
      <div className='donate'>
        <div className='donate__title'>
          <h1>hello Donate</h1>
        </div>
        <div className='donate__progress'>
          <ProgressBar></ProgressBar>
        </div>
        <button className='donate__button' onClick={this.handleClick}>Donate Now</button>


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
      </div>

    )
  }

}
export default FundriserDonate;

