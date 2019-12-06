import React from 'react';
import './fundriser-item.styles.scss'
import ProgressBar from '../progress-bar/progress-bar.component'
import axios from 'axios';
class FundriserItem extends React.Component {
   constructor(props) {
      super(props);
   }
   clickedView = () => {
      this.props.history.push('/fundrisers/'+this.props.item._id)
   }
   delete = async() => {
      console.log('delete '+this.props.item._id);
      let res = await axios.delete('https://enigmatic-fortress-52205.herokuapp.com/fundrisers/'+this.props.item._id)
      console.log(res);
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
            <ProgressBar></ProgressBar>
            <div className='featured__item__raised'>
               <p className='featured__item__raised__text'><b>0$ raised </b> from {this.props.item.goalMoney}</p>
            </div>
            {/* <div className='featured__item__buttons'>
               <div className='featured__item__buttons__view' onClick={this.clickedView}  >
                  <h3>View</h3>
               </div>
               <div className='featured__item__buttons__donate' onClick={ () =>{ this.props.openModal(this.props.item.title, this.props.item.walletAddress, this.props.item._id) }} >
                  <h3>Donate</h3>
               </div>
            </div> */}
            <div className='featured__item__buttons'>
               <div className='featured__item__buttons__view' onClick={this.clickedView}  >
                  <h3>Make Featured</h3>
               </div>
               <div className='featured__item__buttons__delete' onClick={ this.delete } >
                  <h3>Delete</h3>
               </div>
            </div>
         </div>
      )
   }

}
export default FundriserItem;

