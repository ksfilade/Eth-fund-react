import React from 'react';
import './donate-modal.styles.scss'
import Web3 from 'web3'

class DonateModal extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false,
         web3: new Web3(window['ethereum'] || window.web3.currentProvider),
         cABI: [{"constant":false,"inputs":[{"name":"fundAddress","type":"address"}],"name":"send","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialMessage","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":true,"name":"_to","type":"address"}],"name":"Deposit","type":"event"}],
         ADDRESS: '0xB665C09C7CD243Cb82049e03B91CA0656D96530f',
         amount: ''
      }
   }
   clickedClose = () => {
      this.setState({
         show: false
      })
   }
   setField(field, e) {
      this.setState({
          [field]: e.target.value
      })
      console.log(this.state.amount);
   }
   clickedDonate = async () =>{
      console.log('object');
      console.log(this.state.web3);
      let provider = window['ethereum'] || window.web3.currentProvider;
      provider.enable()
      let contract = new this.state.web3.eth.Contract(this.state.cABI, this.state.ADDRESS )
      let account = await this.state.web3.eth.getAccounts()
      console.log(account);
      contract.methods.send(this.props.walletAddress).send
		(
			{
				from: account[0], 
				value: this.state.web3.utils.toWei('0.1', 'ether')
				// validate if it's ETH swap
			},
		)
   }
   componentDidMount () {
      console.log('donate');
      console.log(this.props);
      
   }
   

   render() {
      return (
         <div>{this.props.showModal &&
            <div id="myModal" className="modal">
               <div className="modal-content">
                  <span className="close" onClick={ this.props.closeModal } >&times;</span>
                  <div className='modal-content__title'>
                     <h1>Donate</h1>
                  </div>
                  <div className='modal-content__donation'>
                     <h3 className='modal-content__donation__donate'>Enter your donation for { this.props.title }</h3>
                     <div className='modal-content__donation__input'>
                        <input type="text" />
                        <div className='modal-content__donation__input__value'>
                           <h3>ETH</h3>
                        </div>
                     </div>
                     <div className='modal-content__donation__buttons'>
                        <div className='modal-content__donation__buttons__view' onClick={ this.props.closeModal }  >
                           <h3>Close</h3>
                        </div>
                        <div className='modal-content__donation__buttons__donate' onClick = { this.clickedDonate } >
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

