import React from 'react';
import Banner from '../../components/Home-Page-Banner/home-page-banner.component'
import FeaturedFundrisers from '../../components/Home-Page-Featured/home-page-feautred.component'
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
          <FeaturedFundrisers history = {this.props.history}></FeaturedFundrisers>
        </div>
        
      </div>
    );
  }
  }
  
  export default HomePage;