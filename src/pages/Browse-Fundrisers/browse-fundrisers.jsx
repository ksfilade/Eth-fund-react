import React from 'react';
import FundriserItem from '../../components/Fundriser-Card/fundriser-item.component'
import DonateModal from '../../components/Donate-Modal/donate-modal.component'
import Search from '../../components/Search-Browse-Fundrisers/search.component'
import './browse-fundrisers.scss'
import axios from 'axios'
import Spiner from '../../components/Spinner/spiner.component'
import { connect } from 'react-redux'
import { setFundrisers, setSingleFundriser, getFundrisers,removeFundrisers } from '../../redux/fundrisers/fundrisers.actions'
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
    this.props.removeFundrisers()
    await this.getFundrisers(this.state.query)
    window.addEventListener("scroll", this.handleScroll);
  }
  clickedSearch = (queryItem) => {
    this.props.removeFundrisers()

    this.setState({
      limit: 4,
      skip: 0,
      results: [],
      query: queryItem
    }, () => { this.getFundrisers() }
    )
  }
  handleScroll = async () => {
    console.log('handle scroll');
    if (this.state.allowNewCall && document.getElementById("browse") != undefined && document.getElementById("browse").offsetHeight - 970 < window.scrollY) {
      console.log('here 123');
      this.setState({
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
    // if(this.state.skip == 0 && this.props.fundrisers.length > 0)
     this.setState({
       showSpiner:true,
       skip: this.props.fundrisers.length
     })
     let payLoad ={ skip:this.state.skip, limit:this.state.limit, query:this.state.query }
     this.props.getFundrisers(payLoad)
    
     this.setState({
      showSpiner: false,
    })
  }


  render() {

    return (
      <div id="browse">
        <div className='browse__wrap'>
          <Search clickedSearch={this.clickedSearch}></Search>
        </div>
        <div className='browse__wrap'>


          { <div className='browse'>

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
  setSingleFundriser: fundriser => dispatch(setSingleFundriser(fundriser)),
  removeFundrisers: () => dispatch(removeFundrisers()),
  getFundrisers: (skip, limit, query) => dispatch(getFundrisers(skip, limit, query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseFundrisers);