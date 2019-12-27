import React from 'react';
import FundriserItem from '../../components/Fundriser-Card/fundriser-item.component'
import DonateModal from '../../components/Donate-Modal/donate-modal.component'
import Search from '../../components/Search-Browse-Fundrisers/search.component'
import './user-fundrisers.scss'
import axios from 'axios'
import Spiner from '../../components/Spinner/spiner.component'
import { connect } from 'react-redux'


class UserFundrisers extends React.Component {
  constructor() {
    super()
    this.state = {
      results: [],
     
    }
  }
  componentDidMount() {
    this.getFundrisers(this.state.query)
    window.addEventListener("scroll", this.handleScroll);
  }

  async getFundrisers(query) {
    const results = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers/user/' + this.props.userID,
    { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
    this.setState({
      results: [...results.data.results]
    })
    // this.setState({
    //   allowNewCall: results.data.results.length < this.state.limit ? false : true
    // })

  }


  render() {

    return (
      <div id="browse" >
        <div className='browse__wrap'>
          {/* <Search clickedSearch={this.clickedSearch}></Search> */}
        </div>
        <div className='browse__wrap'>


          <div className='browse' style={{marginTop:'100px'}}>

            {
              this.state.results.map(el => (
                <FundriserItem history={this.props.history} item={el} key={el._id} openModal={this.openModal} balance = {1} ></FundriserItem>
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
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  isLogedin: state.user.isLogedin,
  token: state.user.token,
  userID: state.user.userID
});
export default connect(mapStateToProps, null)(UserFundrisers);