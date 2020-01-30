import axios from 'axios'
export async function loginRegisterUser(signType, data){
    return await axios.post('https://enigmatic-fortress-52205.herokuapp.com/users/' + signType, data)
} 