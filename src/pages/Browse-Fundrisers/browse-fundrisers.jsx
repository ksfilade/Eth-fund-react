import React from 'react';
import FundriserItem from '../../components/Fundriser-Card/fundriser-item.component'
import DonateModal from '../../components/Donate-Modal/donate-modal.component'
import Search from '../../components/Search-Browse-Fundrisers/search.component'
import './browse-fundrisers.scss'
import axios from 'axios'
import Spiner from '../../components/Spinner/spiner.component'

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
    }
  }
  componentDidMount() {
    this.getFundrisers(this.state.query)
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
  async getFundrisers(query) {
    const results = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers?limit=' + this.state.limit + '&skip=' + this.state.skip + this.state.query)
    this.setState({
      results: [...this.state.results, ...results.data.results],
      showSpiner: false,
    })
    this.setState({
      allowNewCall: results.data.results.length < this.state.limit ? false : true
    })

  }


  render() {

    return (
      <div id="browse">
        <div className='browse__wrap'>
          <Search clickedSearch={this.clickedSearch}></Search>
        </div>
        <div className='browse__wrap'>


          <div className='browse'>

            {
              this.state.results.map(el => (
                <FundriserItem history={this.props.history} item={el} key={el._id} openModal={this.openModal} ></FundriserItem>
              ))
            }
            {this.state.showSpiner && <Spiner color='#4CAF50' size='90' background='white'></Spiner>}
            <DonateModal closeModal={this.closeModal} showModal={this.state.showModal} title={this.state.title} walletAddress={this.state.walletAddress} donateTo={this.state.donateTo}></DonateModal>
          </div>

        </div>
      </div>
    );
  }
}

export default BrowseFundrisers;