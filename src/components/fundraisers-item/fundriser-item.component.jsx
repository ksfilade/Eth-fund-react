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
   


render () {
return(
  <div className = 'featured__item'>
     <img src="https://via.placeholder.com/250x150" alt=""/>
     <div className = 'featured__item__location'>
        <h3 className= 'featured__item__location__text'>Skopje,Macedonia</h3>
     </div>
     <div className = 'featured__item__title'>
        <h3 className= 'featured__item__title__text'>Lorem Ipsum Ipsum lorem </h3>
     </div>
     <div className = 'featured__item__content'>
        <p className = 'featured__item__content__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
     </div>
     <ProgressBar></ProgressBar>
     <div className = 'featured__item__raised'>
        <p className = 'featured__item__raised__text'><b>0$ raised </b> from 700000</p>
     </div>
     
     
   </div>
  )
}

}
export default FundriserItem;
  
