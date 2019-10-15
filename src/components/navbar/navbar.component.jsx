import React from 'react';
import './navbar.style.scss'
class Navbar extends React.Component {
constructor(){
  super();
 
  this.handleClick =( e ) => {
    console.log('i am clicked')
  }
   
} 


render () {
return(
  <div className = 'navbar'>
   <div className="navbar__discover">
    <h1>Discover</h1>
   </div>
   <div className="navbar__category">
    <h1>Category</h1>
   </div>
   <div className="navbar__title">
   <h1>goFundMe</h1>
   </div>
   <div className="navbar__register">
    <h1>register</h1>
   </div>
   <div className="navbar__login">
    <h1>login</h1>
   </div>
   <div className="navbar__start">
       <h1>start</h1>
   </div>
  </div>
  )
}

}
export default Navbar;
  
