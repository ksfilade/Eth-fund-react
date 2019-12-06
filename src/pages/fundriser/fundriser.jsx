import React from 'react';
import FundriserContent from '../../components/fundriser-content/fundriser-content.component'
import FundriserDonate from '../../components/fundriser-donate/fundriser-donate.component'
import './fundriser.scss'
import axios from 'axios'

class Fundriser extends React.Component {
    constructor() {
      super()
      this.state = {
      data: {},
      lodaed: false
      }
    }
    async componentDidMount() {
      this.setState({
        data: (await axios.get("https://enigmatic-fortress-52205.herokuapp.com/fundrisers/"+this.props.match.params.id)).data[0]
      }) 
      
      this.setState({
        lodaed: true
      })
    }
    render() {
      
    return (
        <div className = 'fundriser' >
          {this.state.lodaed && <div className = 'fundriser__content'>
            <FundriserContent data = { this.state.data } id = {this.props.match.params.id}></FundriserContent>
          </div>}
         {this.state.lodaed && <div className = 'fundriser__donate'>
            <FundriserDonate data = { this.state.data } id = {this.props.match.params.id}></FundriserDonate>
          </div>}
        </div>
        
    );
  }
  }
  
  export default Fundriser;