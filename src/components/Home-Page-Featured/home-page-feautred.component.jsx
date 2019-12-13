import React from 'react';
import './home-page-featured.styles.scss'
import FundriserItem from '../Fundriser-Card/fundriser-item.component'
import axios from 'axios'
class HomeFeatured extends React.Component {
constructor(){
  super();
  this.state = {
      results: [],
      showModal: false,
      title: '',
      walletAddress: '',
      limit: 4,
      skip: 0,
      showFeatured: false,
  }
  this.handleClick =( e ) => {
    console.log('i am clicked')
  }
   
} 
async componentDidMount(){
  await this.getFundrisers()
  this.setState({
    showFeatured: true
  })
  console.log(this.results);
}
openModal = (title, walletAddress, id) => {
  this.setState({
    showModal: true,
    title: title,
    walletAddress: walletAddress,
    donateTo: id
  })
}
closeModal = () => {
  this.setState({
    showModal: false,
    title: ''
  })
}
async getFundrisers() {
  const results = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers?featured=true')
  console.log(results);
  this.setState({
    results: [...this.state.results, ...results.data.results],
    showSpiner: false,
  })
}
render () {
return(
  <div className = 'featured'>
   
   {this.state.showFeatured && this.state.results.map(el => ( <FundriserItem  history={this.props.history} item={el} key={el._id} openModal={this.openModal}></FundriserItem> ))}
   {/* <FundriserItem></FundriserItem>
   <FundriserItem></FundriserItem> */}
   
  </div>
  )
}

}
export default HomeFeatured;
  
