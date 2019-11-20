const INITIAL_STATE = {
    currentUser : '',
    isLogedin: false,
    token: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return{
                ...state,
                currentUser: action.payload.name,
                isLogedin: action.payload.isLogedin,
                token: action.payload.token
            }
            case 'LOGOUT_USER':
            return{
                ...state,
                currentUser: '',
                isLogedin: false,
                token: ''
            }

        default:
            return state;
    }
}
export default userReducer
// {
//     type:
//     paylogad: 
// }