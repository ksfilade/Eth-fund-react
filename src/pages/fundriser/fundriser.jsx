import React from 'react';
import FundriserContent from '../../components/fundriser-content/fundriser-content.component'
import FundriserDonate from '../../components/fundriser-donate/fundriser-donate.component'
import './fundriser.scss'

class Fundriser extends React.Component {
    // constructor() {
    //   super()
    //   this.state = {
        
    //     search:''
    //   }
    // }
    
    
  
    render() {
      
    return (
        <div className = 'fundriser'>
          <div className = 'fundriser__content'>
            <FundriserContent></FundriserContent>
          </div>
          <div className = 'fundriser__donate'>
            <FundriserDonate></FundriserDonate>
          </div>
        </div>
        
    );
  }
  }
  
  export default Fundriser;