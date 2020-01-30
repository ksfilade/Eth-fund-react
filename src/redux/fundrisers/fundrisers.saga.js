import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { setFundrisers } from './fundrisers.actions';
function* getFundrisers(action) {
    let res = yield call(fetchFundrisers,action.payload.limit,action.payload.skip,action.payload.query)
    yield put(setFundrisers(res.data.results));   
}

function* fundriserSaga() {
    yield takeLatest("GET_FUNDRISERS", getFundrisers);
}
async function fetchFundrisers(limit, skip, query){
        let response = await axios.get('https://enigmatic-fortress-52205.herokuapp.com/fundrisers?limit=' + limit + '&skip=' + skip + query)
        return response
}
export default fundriserSaga;