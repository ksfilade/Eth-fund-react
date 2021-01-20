import React from 'react';
import './fundriser-content.styles.scss'
import axios from 'axios'
class FundriserContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: {},
      showComments: false
    };
  }
  async componentDidMount(){
    console.log('mounted', this.props.id);
    this.getComments()
  }
  getComments = async () =>{
    let res = await axios.get('http://localhost:3001/fundriser/comments?fundriserId=' + this.props.id)
    console.log('mounted data', res.data);
    this.setState({
      resData: res.data,
      showComments: true
    })
  }
  
  render() {
   let el = ['kire', 'bojan']
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
          <h1>Comments</h1>
         { this.state.showComments && this.props.comments.results.reverse().map(el =>(
         
          <div className='donate__donators'>
          <div className='donate__donators__image'>
            <img src="https://www.gofundme.com/static/media/DefaultAvatar.65712475de0674c9f775ae3b64e7c69f.svg" alt="" />
          </div>
          <div className='donate__donators__text'>
           
          {el.amount &&  <div className='donate__donators__text__amount'>
              <h4>{el.commentName + ' donated ETH ' + el.amount}</h4>
              {/* <h5>3 hrs</h5> */}
            </div>
          }
            <div className='donate__donators__text__name' style={{marginTop: '-30px'}}>
              <p>{el.comment}</p>
            </div>
          </div>
        </div>
        ))}
        </div>

      </div>
    )
  }

}
export default FundriserContent;

