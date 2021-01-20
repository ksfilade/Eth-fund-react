import React from 'react';
import './donate-modal.styles.scss'
import { payWithEth } from '../../helpers/web3'
import { connect } from 'react-redux'
import axios from 'axios'

class DonateModal extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
         amount: '',
         donateAnonymous: !this.props.isLogedin,
         successDonation: true,
         donationText: 'Proccessing Donation',
         showMessagess: false,
         comment: ''
      }
   }
   clickedClose = () => {
      this.setState({
         showMessagess: false,
         show: false,
         showMessagess: false,
         successDonation: true,
      })
      this.props.closeModal()

   }
   setField = (field, e) => {
      this.setState({
         [field]: e.target.value
      })
   }
   clickedDonate = async () => {
     console.log(this.props.currentUser, this.props.donateTo, this.state.comment, this.state.amount);
      this.setState({
         successDonation : false,
         showMessagess: true,
         donationText: 'Donation is Processing'
      }) 
       if( await payWithEth(this.props.walletAddress, this.state.amount, this.state.donateAnonymous ? 'Anonymous' : this.props.currentUser, this.props.donateTo) ){
         this.setState({
            donationText: 'Successfull Donation',
            successDonation : true
         })
         let data = {
            fundriserId: this.props.donateTo,
            commentName: this.state.donateAnonymous ? 'Anonymous' : this.props.currentUser,
            comment: this.state.comment,
            amount: this.state.amount
         }
         if(typeof this.props.refreshData == "function")
            this.props.refreshData()
         console.log(data);
         if(this.state.comment === '' || typeof this.props.getCommens === "undefined" )
            return
         let res = await axios.post('http://localhost:3001/fundriser/comments', data, { headers: { 'Content-Type': 'application/json' } })
         this.props.getCommens()
      }
      else{
         this.setState({
            showMessagess: false
         })
      }
    
   }
   componentDidMount(){
      console.log(this.props);
   }
   clickedDonateAnonymous = () => {
      if(this.props.isLogedin)
      this.setState({
         donateAnonymous: !this.state.donateAnonymous
      })
   }
   render() {
      return (
         <div>{this.props.showModal &&
            <div id="myModal" className="modal">
               <div className="modal-content">
                  <span className="close" onClick={this.clickedClose} >&times;</span>
                  <div className='modal-content__title'>
                     <h1>Donate</h1>
                  </div>
                  { !this.state.showMessagess &&  <div className='modal-content__donation'>
                     <h3 className='modal-content__donation__donate'>Enter your donation for {this.props.title}</h3>
                     <div className='modal-content__donation__input'>
                        <input type="text" onChange={this.setField.bind(null, 'amount')} />
                        <div className='modal-content__donation__input__value'>
                           <h3>ETH</h3>
                        </div>
                     </div>
                     {/* <button onClick={() =>{ this.props.getCommens()}}> click me</button> */}
                     <h3 className='modal-content__donation__donate'>Leave Comment</h3>

                     <div className='modal-content__donation__input'>

                        <textarea value={this.state.comment} style={{width: '100%',height: '100px'}} type="text" onChange={this.setField.bind(null, 'comment')} > </textarea>
                        <div className='modal-content__donation__input__value'>
                        </div>
                     </div>
                     <div className={!this.props.isLogedin ? 'modal-content__donation__checkbox__not_loged_user modal-content__donation__checkbox' : 'modal-content__donation__checkbox'}>
                        <div style={{marginTop: '30px'}} className='modal-content__donation__checkbox__value' onClick={this.clickedDonateAnonymous}>
                           {this.state.donateAnonymous && <img src={require('../../assets/img/check.svg')} alt="" />}
                        </div>
                        <div style={{marginTop: '30px'}} className='modal-content__donation__checkbox__text'>
                           <h3>Donate Anonymously</h3>
                        </div>
                     </div>
                     <div className='modal-content__donation__buttons'>
                        <div className='modal-content__donation__buttons__view' onClick={this.clickedClose}  >
                           <h3>Close</h3>
                        </div>
                        <div className='modal-content__donation__buttons__donate' onClick={this.clickedDonate} >
                           <h3>Donate</h3>
                        </div>
                     </div>
                  </div>}
                 {this.state.showMessagess &&  <div className='modal-content__donation__state'>
                     <div className = { this.state.successDonation ? 'modal-content__donation__state__success' : 'modal-content__donation__state__processing'  }>
                     <h1>{this.state.donationText}</h1>
                     </div>
                  </div>}
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

