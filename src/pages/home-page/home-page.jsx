import React from 'react';
import Banner from '../../components/home-page-banner/home-page-banner.component'
import FeaturedFundrisers from '../../components/home-page-featured/home-page-feautred.component'
class HomePage extends React.Component {
    constructor() {
      super()
      this.state = {
        
        search:''
      }
    }
    
    
  
    render() {
      
    return (
      <div className="App">      
        <div>
          <Banner></Banner>
          <FeaturedFundrisers></FeaturedFundrisers>
        </div>
        
      </div>
    );
  }
  }
  
  export default HomePage;