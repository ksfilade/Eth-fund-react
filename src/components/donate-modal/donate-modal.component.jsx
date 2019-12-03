import React from 'react';
import './donate-modal.styles.scss'
import Web3 from 'web3'
import { payWithEth } from '../../helpers/web3'
import axios from 'axios'
import { connect } from 'react-redux'

class DonateModal extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
         amount: '',
         showCheck: false
      }
   }
   clickedClose = () => {
      this.setState({
         show: false
      })
   }
   setField = (field, e) => {
      this.setState({
         [field]: e.target.value
      })
   }
   clickedDonate = async () => {
       payWithEth(this.props.walletAddress, this.state.amount, this.props.currentUser);
      // if (await payWithEth(this.props.walletAddress, this.state.amount)) {
      //    console.log('object');
      //    let data = {
      //       donationFrom: "anonymus",
      //       donationTo: this.props.walletAddress,
      //       amount: parseInt(this.state.amount)
      //    }
      //    axios.post('https://enigmatic-fortress-52205.herokuapp.com/fundrisers/donation', data, { headers: { 'Content-Type': 'application/json' } })
      //       .then(res => {
      //          console.log(res.data);
               
      //       })
      // }

   }
   clickedDonateAnonymous = () => {
      this.setState({
         showCheck: !this.state.showCheck
      })
   }
   render() {
      return (
         <div>{this.props.showModal &&
            <div id="myModal" className="modal">
               <div className="modal-content">
                  <span className="close" onClick={this.props.closeModal} >&times;</span>
                  <div className='modal-content__title'>
                     <h1>Donate</h1>
                  </div>
                  <div className='modal-content__donation'>
                     <h3 className='modal-content__donation__donate'>Enter your donation for {this.props.title}</h3>
                     <div className='modal-content__donation__input'>
                        <input type="text" onChange={this.setField.bind(null, 'amount')} />
                        <div className='modal-content__donation__input__value'>
                           <h3>ETH</h3>
                        </div>
                     </div>
                     <div className='modal-content__donation__checkbox'>
                        <div className='modal-content__donation__checkbox__value' onClick={this.clickedDonateAnonymous}>
                           {this.state.showCheck && <img src="https://www.goglobie.com/wp-content/uploads/2018/03/check-image.png" alt="" />}
                        </div>
                        <div className='modal-content__donation__checkbox__text'>
                           <h3>Donate Anonymously</h3>
                        </div>
                     </div>
                     <div className='modal-content__donation__buttons'>
                        <div className='modal-content__donation__buttons__view' onClick={this.props.closeModal}  >
                           <h3>Close</h3>
                        </div>
                        <div className='modal-content__donation__buttons__donate' onClick={this.clickedDonate} >
                           <h3>Donate</h3>
                        </div>
                     </div>
                  </div>
               </div>
            </div>}
         </div>
      )
   }

}
const mapStateToProps = state => ({
   currentUser: state.user.currentUser,
   isLogedin: state.user.isLogedin,
   token: state.user.token
 });
export default connect(mapStateToProps, null)(DonateModal);

