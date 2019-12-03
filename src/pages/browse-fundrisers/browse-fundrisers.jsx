import React from 'react';
import FundriserItem from '../../components/fundraisers-item/fundriser-item.component'
import DonateModal from '../../components/donate-modal/donate-modal.component'
import Search from '../../components/search/search.component'
import './browse-fundrisers.scss'
import axios from 'axios'
import Spiner from '../../components/spiner/spiner.component'

class BrowseFundrisers extends React.Component {
    constructor() {
      super()
      this.state = {
       results: [],
       showModal: false,
       title: '',
       walletAddress: '',
       limit: 4,
       skip: 0,
       showSpiner: false
      }
    }
    componentDidMount(){
      this.getFundrisers()
      window.addEventListener("scroll", this.handleScroll);   
      console.log(this.props.history); 
    }
    handleScroll = async () => {
      
      if(document.getElementById("browse") != undefined && document.getElementById("browse").offsetHeight-670 < window.scrollY){
        await this.setState({
          skip: this.state.skip+4,
          showSpiner: true
        })
        await this.getFundrisers()
      }
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
      const results = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers?limit='+this.state.limit+'&skip='+this.state.skip)
      this.setState({
        results: [...this.state.results,...results.data.results],
        showSpiner: false
      })
    }
    openSingleFundriser = (id) =>{
      console.log('here');
      console.log(id);
    }
  
    render() {
      
    return (
      <div id="browse">
        <Search></Search>
        <div className='browse__wrap'>
        
          
          <div className = 'browse'>
          
            {
              this.state.results.map(el =>(
                <FundriserItem item = {el} key={el._id} openModal = {this.openModal} ></FundriserItem>
              ))  
            }
            {this.state.showSpiner && <Spiner></Spiner>}
            <DonateModal closeModal = {this.closeModal} showModal = {this.state.showModal} title = {this.state.title} walletAddress = { this.state.walletAddress }></DonateModal>
          </div>
          
        </div>
      </div>
    );
  }
  }
  
  export default BrowseFundrisers;