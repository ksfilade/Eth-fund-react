import React from 'react';
import './snackbar.styles.scss'

class SnackBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: 'show'
    }
  }
  componentDidMount(){
    setTimeout(() =>{
      this.setState({
        className: ''
      })
    },3000)
  }
  componentDidUpdate(){
    console.log('updated ');
  }
  render() {
   
    return (
    <div>
        <div id="snackbar" className={this.state.className}>{this.props.amount + this.props.donationFrom}</div>
    </div>

    )
  }

}
export default SnackBar;

