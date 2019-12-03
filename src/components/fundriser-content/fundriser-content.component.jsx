import React from 'react';
import './fundriser-content.styles.scss'
import axios from 'axios';

class FundriserContent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }
  async componentDidMount() {
    console.log('object');
    this.setState({
      data: (await axios.get("https://enigmatic-fortress-52205.herokuapp.com/fundrisers/"+this.props.id)).data[0]
    }) 
    console.log(this.state.data);
  }


  render() {
    return (
      <div>
        <h1>{this.state.data.title}</h1>
        <img className='thumbanil' src={"https://enigmatic-fortress-52205.herokuapp.com"+this.state.data.image} alt="" />
        <div className='content'>
          <div className='content__organaizer'>
            <img src="https://www.gofundme.com/static/media/AnonymousAvatar.9a4676309ac8b8e4c4fb08b0957bd6cf.svg" alt="" />
            <h4 className='content__organaizer__text'> Sikhs of Houston is organizing this fundraiser.</h4>
          </div>
          <div className='content__created'>
            <div className='content__created__date'>
              <h5>Created { new Date( this.state.data.dateCreated).toString().split(' ')[1] +" "+new Date( this.state.data.dateCreated).toString().split(' ')[2] +" "+ new Date( this.state.data.dateCreated).toString().split(' ')[3] }</h5>
            </div>
            <div className='content__created__category'>
              <h5>Funerals & Memorials</h5>
            </div>

          </div>
          <div className='content__text'>
            <p>{this.state.data.description}</p>
          </div>
        </div>
      </div>
    )
  }

}
export default FundriserContent;

