import React from 'react';
import './fundriser-item.styles.scss'
import ProgressBar from '../Porgress-Bar/progress-bar.component'
import axios from 'axios';
import { connect } from 'react-redux'
import Spinner from '../Spinner/spiner.component'
// import { getBallance } from '../../helpers/web3'
class FundriserItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         deleted: false,
         showFeaturedSpinner: false,
         showDeleteSpinner: false,
         showRemoveFeatured: false,
         featured: false,
         raisedMoney: 0,
         widthStyle:{
            width: '0%'
         },
      }
   }
   clickedView = () => {
      this.props.history.push('/fundrisers/'+this.props.item._id)
   }
   clickedEdit = () => {
      this.props.history.push('/edit-fundrisers/'+this.props.item._id)
   }
   delete = async () => {
      this.setState({
         showDeleteSpinner: true
      })
      let res = await axios.delete('http://localhost:3001/fundrisers/'+this.props.item._id,{ headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
      this.setState({
         showDeleteSpinner: false
      })
      if(res.data.success)
         this.setState({
            deleted: true
         })
   }
   getBalnce = async () =>{
      let res = await axios.get('http://localhost:3001/fundrisers/donations/'+this.props.item._id)
      return res.data.sum
   }
   makeFeatured = async ( condition ) =>{
      this.setState({
         showFeaturedSpinner: true
      })
      let data = {
         featured: condition
      }
      let res = await axios.put('http://localhost:3001/fundrisers/'+this.props.item._id, data, { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
      this.setState({
         showFeaturedSpinner: false,
         showRemoveFeatured: condition,
         featured: condition,
      })
   }
   async componentDidMount () {
      console.log(this.props.item);
      let item = this.props.balance;
      let balance = item
      let percent = balance/this.props.item.goalMoney*100;
      this.setState({
         featured: this.props.item.featured,
         widthStyle:{
            width: percent+'%'
         },
         raisedMoney: Math.round( balance * 100 )/100
      })
   }
   
   render() {
      return (
         <div className='featured__item' >
            <div className='featured__item__image_div'>
               <img src={this.props.item.image == undefined ? "https://via.placeholder.com/350x200" : "https://enigmatic-fortress-52205.herokuapp.com" + this.props.item.image} alt="" />
            </div>
            <div className='featured__item__location'>
               <h3 className='featured__item__location__text'>{this.props.item.city},{this.props.item.country}</h3>
            </div>
            <div className='featured__item__title'>
               <h3 className='featured__item__title__text'>{this.props.item.title} </h3>
            </div>
            <div className='featured__item__content'>
               {this.props.item.description !==undefined && <p className='featured__item__content__text'>{this.props.item.description.slice(0,105) + '...'}</p>}
            </div>
            <div className='featured__item__raised'>
               <p className='featured__item__raised__text'><b>{this.props.balance.toFixed(2)} ETH raised </b> from {this.props.item.goalMoney}</p>
            </div>
           <ProgressBar style = {{width: this.props.balance/this.props.item.goalMoney*100+'%'}}></ProgressBar>
            
            {!this.props.admin && <div className='featured__item__buttons'>
              {this.props.history.location.pathname != '/user-fundrisers' && <div className='featured__item__buttons__view' onClick={this.clickedView}  >
                  <h3>View</h3>
               </div>}
               {this.props.history.location.pathname == '/user-fundrisers' && <div className='featured__item__buttons__view' onClick={this.clickedEdit}  >
                  <h3>Edit</h3>
               </div>}
               {this.props.history.location.pathname != '/user-fundrisers' && <div className='featured__item__buttons__donate' onClick={ () =>{ this.props.openModal(this.props.item.title, this.props.item.walletAddress, this.props.item._id) }} >
                  <h3>Donate</h3>
               </div>}
            </div>}
            {this.props.admin && <div className='featured__item__buttons'>
               {(!this.state.featured ) && <div className='featured__item__buttons__view' onClick = { () =>{ this.makeFeatured(!this.state.featured) } }  >
                  {!this.state.showFeaturedSpinner && <h3>Make Featured</h3>}
                  {this.state.showFeaturedSpinner && <Spinner color='#4CAF50' size='30' background='white'></Spinner>}
               </div>}
               {(this.state.featured ) && <div className = 'featured__item__buttons__delete' onClick={ () =>{ this.makeFeatured(!this.state.featured) } } >
                  {!this.state.showFeaturedSpinner && <h3>Remove Featured</h3>}
                  {this.state.showFeaturedSpinner && <Spinner color='white' size='30' background='red'></Spinner>}
               </div>}
               <div className = {this.state.deleted ? 'featured__item__buttons__delete featured__item__buttons__delete_deleted' : 'featured__item__buttons__delete'} onClick={ this.delete } >
                  {!this.state.showDeleteSpinner &&  <h3>Delete</h3>}
                  {this.state.showDeleteSpinner && <Spinner color='white' size='30' background='red'></Spinner>}
               </div>
            </div>}
         </div>
      )
   }
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    isLogedin: state.user.isLogedin,
    token: state.user.token,
    admin: state.user.admin,
    fundrisers: state.fundriser.fundrisers
});
export default connect(mapStateToProps, null)(FundriserItem);

