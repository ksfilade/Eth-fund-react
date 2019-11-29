import React from 'react';
import axios from 'axios'
import { setCurrentUser } from '../../redux/user/user.actions'
import Spiner from '../../components/spiner/spiner.component'
import { validateEmail } from '../../helpers/checkFunctions'
import { checkIfMatch } from '../../helpers/checkFunctions'
import { checkIfEmpty } from '../../helpers/checkFunctions'

const withSign = WrappedComponent => {
  class withSign extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        data: [],
        showErrorMessage: false,
        message: '',
        showSpiner: false,

      };
    }

    componentDidMount() {
      console.log('hello wraped component');
    }
    submitHandler = async (signType, data) => {
      // console.log(validateEmail(data.email));
      if (!validateEmail(data.email))
        return this.setState({
          showErrorMessage: true,
          message: 'Email is not Valid'
        })

      if (data.repatPassword != undefined && !checkIfMatch(data.password, data.repatPassword))
        return this.setState({
          showErrorMessage: true,
          message: 'Passwords do not Match'
        })

      if (data.firstName != undefined && !checkIfEmpty(data.firstName))
        return this.setState({
          showErrorMessage: true,
          message: 'First Name is requierd Field'
        })
        this.setState({
          showSpiner: true
        })

      let res = await axios.post('https://enigmatic-fortress-52205.herokuapp.com/users/' + signType, data)
      if (res.data.success == undefined) {
        
        this.props.setCurrentUser({ name: res.data.user.firstName, isLogedin: true, token: res.data.token })
        this.props.history.push('/')
      }
      else
        this.setState({
          showErrorMessage: true,
          message: 'wrong credentials',
          showSpiner: false
        })
    }
    render() {
      const { dataSource, ...otherProps } = this.props;

      return <WrappedComponent submitHandler={this.submitHandler} showErrorMessage={this.state.showErrorMessage} message={this.state.message} showSpiner={this.state.showSpiner} {...otherProps} />

    }
  }

  return withSign;
};

export default withSign;