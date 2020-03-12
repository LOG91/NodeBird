import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_FAILURE, LOG_IN_SUCCESS} from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
}

function* login() {
  try {
    yield call(loginAPI); // call은 동기적 요청, fork는 비동기적 요청
    yield put({ // put은 dispatch와 동일
      type: LOG_IN_SUCCESS,
    })
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE
    })
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN, login);
}

export default function* userSaga() {
  yield all([fork(watchLogin)])
}