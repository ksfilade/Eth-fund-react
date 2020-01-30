import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { loginRegisterUser } from '../../services/api'

function* login(action) {
    
    let res = loginRegisterUser(action.payload.type, action.payload.data)
    yield put({ type: 'SET_CURRENT_USER', res })

}
function* logout(action) {
    console.log('logouted user');
 }

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* userSaga() {
  yield takeLatest("LOGIN_USER", login);
  yield takeLatest("LOGOUT_USER", logout);
}

export default userSaga;