import React from 'react';
import './donate-modal.styles.scss'
import Web3 from 'web3'
import { payWithEth } from '../../helpers/web3'

class DonateModal extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
         amount: ''
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
     payWithEth(this.props.walletAddress, this.state.amount)

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
export default DonateModal;

