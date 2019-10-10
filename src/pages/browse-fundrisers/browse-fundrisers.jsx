import React from 'react';
import FundriserItem from '../../components/fundraisers-item/fundriser-item.component'
import './browse-fundrisers.scss'

class BrowseFundrisers extends React.Component {
    constructor() {
      super()
      this.state = {
        
        search:''
      }
    }
    
    
  
    render() {
      
    return (
        <div className = 'browse'>
          <FundriserItem></FundriserItem>
          <FundriserItem></FundriserItem>
          <FundriserItem></FundriserItem>
          <FundriserItem></FundriserItem>
          <FundriserItem></FundriserItem>
          <FundriserItem></FundriserItem>
        </div>
        
    );
  }
  }
  
  export default BrowseFundrisers;