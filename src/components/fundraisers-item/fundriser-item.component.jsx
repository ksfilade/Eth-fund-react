import React from 'react';
import './fundriser-item.styles.scss'
import ProgressBar from '../progress-bar/progress-bar.component'
import axios from 'axios';
import { connect } from 'react-redux'
import Spinner from '../../components/spiner/spiner.component'
import { getBallance } from '../../helpers/web3'
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
         showProgressBar: false
      }
   }
   clickedView = () => {
      this.props.history.push('/fundrisers/'+this.props.item._id)
   }
   delete = async () => {
      this.setState({
         showDeleteSpinner: true
      })
      let res = await axios.delete('https://enigmatic-fortress-52205.herokuapp.com/fundrisers/'+this.props.item._id,{ headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
      this.setState({
         showDeleteSpinner: false
      })
      if(res.data.success)
         this.setState({
            deleted: true
         })
   }
   makeFeatured = async ( condition ) =>{
      this.setState({
         showFeaturedSpinner: true
      })
      let data = {
         featured: condition
      }
      let res = await axios.put('https://enigmatic-fortress-52205.herokuapp.com/fundrisers/'+this.props.item._id, data, { headers: { 'Content-Type': 'application/json', 'token': this.props.token } })
      this.setState({
         showFeaturedSpinner: false,
         showRemoveFeatured: condition,
         featured: condition,
      })
   }
   async componentDidMount () {
      console.log(this.props.item.goalMoney);
      let balance =  await getBallance(this.props.item.walletAddress);
      let percent = balance/this.props.item.goalMoney*100;
      console.log(percent);
      this.setState({
         featured: this.props.item.featured,
         widthStyle:{
            width: percent+'%'
         },
         showProgressBar: true,
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
               <p className='featured__item__content__text'>{this.props.item.description.slice(0,105) + '...'}</p>
            </div>
            <div className='featured__item__raised'>
               <p className='featured__item__raised__text'><b>{this.state.raisedMoney} ETH raised </b> from {this.props.item.goalMoney}</p>
            </div>
            {this.state.showProgressBar && <ProgressBar style = {this.state.widthStyle}></ProgressBar>}
            
            {!this.props.admin && <div className='featured__item__buttons'>
               <div className='featured__item__buttons__view' onClick={this.clickedView}  >
                  <h3>View</h3>
               </div>
               <div className='featured__item__buttons__donate' onClick={ () =>{ this.props.openModal(this.props.item.title, this.props.item.walletAddress, this.props.item._id) }} >
                  <h3>Donate</h3>
               </div>
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
    admin: state.user.admin
});
export default connect(mapStateToProps, null)(FundriserItem);

