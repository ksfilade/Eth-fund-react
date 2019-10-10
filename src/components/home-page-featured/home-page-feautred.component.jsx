import React from 'react';
import './home-page-featured.styles.scss'
import FundriserItem from '../fundraisers-item/fundriser-item.component'
class HomeBanner extends React.Component {
constructor(){
  super();
 
  this.handleClick =( e ) => {
    console.log('i am clicked')
  }
   
} 
componentDidMount(){
  
}


render () {
return(
  <div className = 'featured'>
   
   <FundriserItem></FundriserItem>
   <FundriserItem></FundriserItem>
   <FundriserItem></FundriserItem>
   
  </div>
  )
}

}
export default HomeBanner;
  
