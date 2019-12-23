import React from 'react';
import './fundriser-content.styles.scss'

class FundriserContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  
  render() {
    return (
      <div>
        <h1>{this.props.data.title}</h1>
        <img className='thumbanil' src={this.props.data.image != undefined? "https://enigmatic-fortress-52205.herokuapp.com"+this.props.data.image : "https://via.placeholder.com/350x200"} alt="" />
        <div className='content'>
          <div className='content__organaizer'>
            <img src="https://www.gofundme.com/static/media/AnonymousAvatar.9a4676309ac8b8e4c4fb08b0957bd6cf.svg" alt="" />
            <h4 className='content__organaizer__text'> { this.props.data.organaiser }</h4>
          </div>
          <div className='content__created'>
            <div className='content__created__date'>
              <h5>Created { new Date( this.props.data.dateCreated).toString().split(' ')[1] +" "+new Date( this.props.data.dateCreated).toString().split(' ')[2] +" "+ new Date( this.props.data.dateCreated).toString().split(' ')[3] }</h5>
            </div>
            <div className='content__created__category'>
              <h5>{ this.props.data.category }</h5>
            </div>

          </div>
          <div className='content__text'>
            <p>{this.props.data.description}</p>
          </div>
        </div>
      </div>
    )
  }

}
export default FundriserContent;

