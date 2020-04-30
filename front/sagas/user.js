import axios from 'axios';
import { all, delay, call, put, fork, takeLatest, takeEvery, take } from 'redux-saga/effects';
import { LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_IN_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

const HELLO_SAGA = 'HELLO_SAGA';

function* login() {
  try {
    // yield call(loginAPI); // call은 동기적 요청, fork는 비동기적 요청
    yield delay(2000); // 아직 로그인API
    yield put({ // put은 dispatch와 동일
      type: LOG_IN_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('http://localhost:3065/api/user', signUpData);
}

function* signUp(action) {
  try {
    // yield call(signUpAPI); // call은 동기적 요청, fork는 비동기적 요청
    yield call(signUpAPI, action.data);
    yield put({ // put은 dispatch와 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLogin() { // watch하고 있던 액션이 들어오면 signUp함수를 실행시킨다
  yield takeLatest(LOG_IN_REQUEST, login);
}

// function* watchHello() {
//   yield takeEvery(HELLO_SAGA, function* () {
//     console.log(123);
//     console.log(456);
//     console.log(789);
//     yield put({ type: SIGN_UP_FAILURE });
//   });
// }

function* helloSaga() {
  console.log('before saga');
  yield take(HELLO_SAGA);
  console.log('hello saga');
}

export default function* userSaga() {
  yield all([
    fork(helloSaga),
    fork(watchSignUp),
    fork(watchLogin),
  ]);
}
