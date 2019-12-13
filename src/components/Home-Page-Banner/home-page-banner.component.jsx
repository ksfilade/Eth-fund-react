import React from 'react';
import './home-page-banner.styles.scss'
class HomeBanner extends React.Component {
constructor(){
  super();
  this.handleClick =( e ) => {
    console.log('i am clicked')
  }
}
   


render () {
return(
  <div className = 'home'>
    <div className = 'home__text-area'>
      <h1 className = 'home__text-area__text'>Fundraising for the people and causes you cae about</h1>
      <p className = 'home__text-area__samll-text' >Get Started Today</p>
      <button className = 'home__text-area__button' onClick={this.handleClick}>Start GoFundMe</button>
    </div>
  </div>
  )
}

}
export default HomeBanner;
  
