export const setFundrisers = fundriser => ({
    type: 'SET_FUNDRISERS',
    payload: fundriser
})
export const setSingleFundriser = fundriser => ({
    type: 'SET_SINGLE_FUNDRISER',
    payload: fundriser
})
export const getFundrisers = fundriser => ({
    type: 'GET_FUNDRISERS',
    payload: fundriser
})

export const removeFundrisers = fundriser => ({
    type: 'REMOVE_FUNDRISERS',
})
