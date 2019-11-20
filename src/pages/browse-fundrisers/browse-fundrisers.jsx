import React from 'react';
import FundriserItem from '../../components/fundraisers-item/fundriser-item.component'
import './browse-fundrisers.scss'
import axios from 'axios'
class BrowseFundrisers extends React.Component {
    constructor() {
      super()
      this.state = {
       results: []
      }
    }
    componentDidMount(){
      this.getFundrisers()
    }
    async getFundrisers () {
      const results = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers')
      this.setState({
        results: results.data.results
      })
      console.log(this.state.results);
    }
    
  
    render() {
      
    return (
      <div className='browse__wrap'>
        <div className = 'browse'>
           {
            this.state.results.map(el =>(
              <FundriserItem item = {el} key={el._id}></FundriserItem>
            ))  
          }
        </div>
      </div>
    );
  }
  }
  
  export default BrowseFundrisers;