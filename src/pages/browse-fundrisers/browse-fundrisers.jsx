import React from 'react';
import FundriserItem from '../../components/fundraisers-item/fundriser-item.component'
import DonateModal from '../../components/donate-modal/donate-modal.component'

import './browse-fundrisers.scss'
import axios from 'axios'
class BrowseFundrisers extends React.Component {
    constructor() {
      super()
      this.state = {
       results: [],
       showModal: false,
       title: '',
       walletAddress: ''
      }
    }
    componentDidMount(){
      this.getFundrisers()
      // this.hello()
    }
    openModal = (title, walletAddress) =>{
      this.setState({
        showModal: true,
        title: title,
        walletAddress: walletAddress
      })
    }
    closeModal = () =>{
      this.setState({
        showModal: false,
        title: ''
      })
    }
    async getFundrisers () {
      const results = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers')
      this.setState({
        results: results.data.results
      })
      console.log('here results');
      console.log(this.state.results);
    }
    
  
    render() {
      
    return (
      <div className='browse__wrap'>
        <div className = 'browse'>
           {
            this.state.results.map(el =>(
              <FundriserItem item = {el} key={el._id} openModal = {this.openModal} ></FundriserItem>
            ))  
          }
          <DonateModal closeModal = {this.closeModal} showModal = {this.state.showModal} title = {this.state.title} walletAddress = { this.state.walletAddress }></DonateModal>
        </div>
        
      </div>
    );
  }
  }
  
  export default BrowseFundrisers;