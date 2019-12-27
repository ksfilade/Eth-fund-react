import React from 'react';
import FundriserItem from '../../components/Fundriser-Card/fundriser-item.component'
import DonateModal from '../../components/Donate-Modal/donate-modal.component'
import Search from '../../components/Search-Browse-Fundrisers/search.component'
import './browse-fundrisers.scss'
import axios from 'axios'
import Spiner from '../../components/Spinner/spiner.component'
import { connect } from 'react-redux'
import { setFundrisers, setSingleFundriser } from '../../redux/fundrisers/fundrisers.actions'
import Fundriser from '../Single-Fundriser/fundriser';
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
      showSpiner: false,
      query: '',
      allowNewCall: true,
      renderItems: false
    }
  }
  async componentDidMount() {
    await this.getFundrisers(this.state.query)
    window.addEventListener("scroll", this.handleScroll);
  }
  clickedSearch = (queryItem) => {
    this.setState({
      limit: 4,
      skip: 0,
      results: [],
      query: queryItem
    }, () => { this.getFundrisers() }
    )
  }
  handleScroll = async () => {

    if (this.state.allowNewCall && document.getElementById("browse") != undefined && document.getElementById("browse").offsetHeight - 670 < window.scrollY) {
      this.setState({
        skip: this.state.skip + 4,
        showSpiner: true,
        allowNewCall: false
      })
      await this.getFundrisers(this.state.query)

    }
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
  async getFundrisers() {
    if(this.state.skip == 0 && this.props.fundrisers.length > 0)
     this.setState({
       skip: this.props.fundrisers.length
     })
    const results = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers?limit=' + this.state.limit + '&skip=' + this.props.fundrisers.length + this.state.query)
    let data = results.data.results
    
    await this.props.setFundrisers(data)
    this.setState({
      allowNewCall: results.data.results.length < this.state.limit ? false : true,
      showSpiner: false,
      renderItems: true
    })
  }
  getBalnce = async (id) =>{
    let res = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers/donations/'+id)
    return res.data.sum
 }


  render() {

    return (
      <div id="browse">
        <div className='browse__wrap'>
          <Search clickedSearch={this.clickedSearch}></Search>
        </div>
        <div className='browse__wrap'>


          {this.state.renderItems && <div className='browse'>

            {
              this.props.fundrisers.map(el => (
                <FundriserItem history={this.props.history} item={el.data} key={el.data._id} openModal={this.openModal} balance={el.balance} ></FundriserItem>
              ))
            }
            {this.state.showSpiner && <Spiner color='#4CAF50' size='90' background='white'></Spiner>}
            <DonateModal closeModal={this.closeModal} showModal={this.state.showModal} title={this.state.title} walletAddress={this.state.walletAddress} donateTo={this.state.donateTo}></DonateModal>
          </div>}

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userID: state.user.userID,
  fundrisers: state.fundriser.fundrisers
});
const mapDispatchToProps = dispatch => ({
  setFundrisers: fundriser => dispatch(setFundrisers(fundriser)),
  setSingleFundriser: fundriser => dispatch(setSingleFundriser(fundriser))
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseFundrisers);