import React from 'react';
import './fundriser-item.styles.scss'
import ProgressBar from '../progress-bar/progress-bar.component'
class FundriserItem extends React.Component {
constructor(){
  super();
  this.handleClick =( e ) => {
    console.log('i am clicked')
  }
}
componentDidMount(){
   console.log(this.props);
}
   


render () {
return(
  <div className = 'featured__item'>
     <img src="https://via.placeholder.com/250x150" alt=""/>
     <div className = 'featured__item__location'>
        <h3 className= 'featured__item__location__text'>{this.props.item.city},{this.props.item.country}</h3>
     </div>
     <div className = 'featured__item__title'>
        <h3 className= 'featured__item__title__text'>{this.props.item.title} </h3>
     </div>
     <div className = 'featured__item__content'>
        <p className = 'featured__item__content__text'>{this.props.item.description}</p>
     </div>
     <ProgressBar></ProgressBar>
     <div className = 'featured__item__raised'>
        <p className = 'featured__item__raised__text'><b>0$ raised </b> from {this.props.item.goalMoney}</p>
     </div>
     
     
   </div>
  )
}

}
export default FundriserItem;
  
