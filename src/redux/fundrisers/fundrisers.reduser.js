const INITIAL_STATE = {
    fundrisers: [],
}

const fundrisersReducer = (state = INITIAL_STATE, action) => {
    console.log(action.payload);
    switch (action.type) {

        case 'SET_FUNDRISERS':
            return {
                ...state,
                fundrisers: [...state.fundrisers, ...action.payload]
            }
        case 'SET_SINGLE_FUNDRISER':
            state.fundrisers.forEach((el,index,arr) =>{
                if(action.payload._id == el._id)
                    arr[index] = el
            } )
            console.log(state.fundrisers)
            return {
                ...state,
                fundrisers: [...state.fundrisers]
            }
        default:
            return state;
    }
}
export default fundrisersReducer
// {
//     type:
//     paylogad: 
// }