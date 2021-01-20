import React from 'react';
import FundriserContent from '../../components/Single-Fundriser-Content/fundriser-content.component'
import FundriserDonate from '../../components/Single-Fundriser-Doante/fundriser-donate.component'
import './fundriser.scss'
import axios from 'axios'

class Fundriser extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {},
      lodaed: false,
      resData: [],
      showComments: false
    }
  }
  async componentDidMount() {
    this.getComments()
    this.setState({
      data: (await axios.get("http://localhost:3001/fundrisers/" + this.props.match.params.id)).data[0]
    })

    this.setState({
      lodaed: true
    })
  }
  getComments = async () =>{
    let res = await axios.get('http://localhost:3001/fundriser/comments?fundriserId=' + this.props.match.params.id)
    console.log('mounted data here 123', res);
    this.setState({
      resData: res.data,
      showComments: true
    })
    }
  render() {

    return (
      <div className='fundriser' >
        <div className='fundriser__wrap'>
          {this.state.lodaed && <div className='fundriser__content'>
            <FundriserContent comments={this.state.resData} data={this.state.data} id={this.props.match.params.id}></FundriserContent>
          </div>}
          {this.state.lodaed && <div className='fundriser__donate'>
            <FundriserDonate getComments={() =>{ this.getComments() }} data={this.state.data} id={this.props.match.params.id}></FundriserDonate>
          </div>}
        </div>
      </div>
    );
  }
}

export default Fundriser;