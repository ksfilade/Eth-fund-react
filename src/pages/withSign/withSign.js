import React from 'react';
import axios from 'axios'
import { setCurrentUser } from '../../redux/user/user.actions'

const withSign = WrappedComponent => {
  class withSign extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        data: []
      };
    }

    componentDidMount() {
      console.log('hello wraped component');
    }
    submitHandler = async (signType, data) => {
        // let { email, password } = data ;
        // delete user.repatPassword;
        let res = await axios.post('https://enigmatic-fortress-52205.herokuapp.com/users/'+signType, data).catch(() => {
            console.log('error');
        })
        console.log(res);
        if (res.data.success == undefined) {
            this.props.setCurrentUser({ name: res.data.user.firstName, isLogedin: true, token: res.data.token })
            this.props.history.push('/')
        }
        else
            this.setState({
                wrondCredentials: true
            })

    }
    render() {
      const { dataSource, ...otherProps } = this.props;

        return <WrappedComponent submitHandler={this.submitHandler} {...otherProps} />
      
    }
  }

  return withSign;
};

export default withSign;