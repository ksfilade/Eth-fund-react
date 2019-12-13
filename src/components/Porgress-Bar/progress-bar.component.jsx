import React from 'react';
import './progress-bar.styles.scss'
class ProgressBar extends React.Component {
constructor(props){
  super(props);
  this.handleClick =( e ) => {
    console.log('i am clicked')
  }
  
}
render () {
return(
     <div className = 'progress'>
        {/* <p className = 'progress__text'>Last donation 1m ago</p> */}
        <div className = 'progress__bar-container'>
            <div className= 'progress__bar-container__content' style={this.props.style}>
              <div className='progress__bar-container__content__animated' >

              </div>
            </div>
        </div>
     </div>
     
  )
}

}
export default ProgressBar;
  
