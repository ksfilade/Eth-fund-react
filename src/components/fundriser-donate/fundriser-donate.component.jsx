import React from 'react';
import './fundriser-donate.styles.scss'
import ProgressBar from '../progress-bar/progress-bar.component'

class FundriserDonate extends React.Component {
// constructor(){
//   super();
  
// }
   


render () {
  const element = []
  for (let index = 0; index < 3; index++) {
    element.push(
    <div className = 'donate__donators'>
      <div className = 'donate__donators__image'>
        <img src="https://www.gofundme.com/static/media/DefaultAvatar.65712475de0674c9f775ae3b64e7c69f.svg" alt=""/>
      </div>
      <div className = 'donate__donators__text'>
        <div className = 'donate__donators__text__name'>
          <h5>Sukirat Singh </h5>
        </div>
        <div className = 'donate__donators__text__amount'>
          <h4>$100</h4>
          <h5>4 hrs</h5>
        </div>
      </div>
    </div>
    )
    
  }
return(
  <div className = 'donate'>
    <div  className = 'donate__title'>
      <h1>hello Donate</h1>
    </div>
    <div className = 'donate__progress'>
      <ProgressBar></ProgressBar>
    </div>
    <button className = 'donate__button' onClick={this.handleClick}>Donate Now</button>
      
    
    <div className = 'donate__donators'>
      <div className = 'donate__donators__image'>
        <img src="https://www.gofundme.com/static/media/DefaultAvatar.65712475de0674c9f775ae3b64e7c69f.svg" alt=""/>
      </div>
      <div className = 'donate__donators__text'>
        <div className = 'donate__donators__text__name'>
          <h5>Sukirat Singh </h5>
        </div>
        <div className = 'donate__donators__text__amount'>
          <h4>$100</h4>
          <h5>4 hrs</h5>
        </div>
      </div>
      
    </div>
    {element}
  </div>
    
  )
}

}
export default FundriserDonate;
  
