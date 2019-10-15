import React from 'react';
import './fundriser-content.styles.scss'

class FundriserContent extends React.Component {
constructor(){
  super();
  this.handleClick =( e ) => {
    console.log('i am clicked')
  }
}
   


render () {
return(
  <div>
    <h1>Deputy Sandeep Singh Dhaliwal Fund</h1>
    <img src="https://via.placeholder.com/750x350" alt=""/>
    <div className = 'content'>
      <div className = 'content__organaizer'>
        <img src="https://www.gofundme.com/static/media/AnonymousAvatar.9a4676309ac8b8e4c4fb08b0957bd6cf.svg" alt=""/>
        <h4 className = 'content__organaizer__text'> Sikhs of Houston is organizing this fundraiser.</h4>
      </div>
      <div className = 'content__created'>
        <div className = 'content__created__date'>
          <h5>Created September 27, 2019</h5>
        </div>
        <div className = 'content__created__category'>
          <h5>Funerals & Memorials</h5>
        </div>
        
      </div>
      <div className = 'content__text'>
        <p>Deputy Sandeep Singh Dhaliwal was the first Sikh to be accommodated with his articles of faith as a member of the Harris County Sheriff's Department.  In this very line of duty, his life was taken in a senseless manner on September, 27th, 2019.  Deputy Dhaliwal is survived by his wife and three children and many members of the Houston Sikh Community who will feel this void for years to come.

        OFFICIAL FUND APPROVED BY THE DHALIWAL FAMILY!  This fund has been established to help in the  Dhaliwal kids' educational  endeavors, unforseen expenses,  for and provide hopes and dreams through the same vision that Deputy Dhaliwal had.

        'Pioneering' deputy dies after being shot from behind</p>
      </div>
    </div>
  </div>
  )
}

}
export default FundriserContent;
  
