import axios from 'axios';
import { all, delay, call, put, fork, takeLatest, takeEvery, take } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../reducers/user';

axios.defaults.baseURL = 'http://localhost:3065/api';

function logInAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData, { withCredentials: true });
}

const HELLO_SAGA = 'HELLO_SAGA';

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); // call은 동기적 요청, fork는 비동기적 요청
    yield put({ // put은 dispatch와 동일
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogIn() { // watch하고 있던 액션이 들어오면 login함수를 실행시킨다
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user', signUpData);
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


function logOutAPI() {
  return axios.post('/user/logout', {}, { withCredentials: true });
}

function* logOut() {
  try {
    // yield call(signUpAPI); // call은 동기적 요청, fork는 비동기적 요청
    yield call(logOutAPI);
    yield put({ // put은 dispatch와 동일
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function loadUserAPI() {
  return axios.get('/user', { withCredentials: true });
}

function* loadUser() {
  try {
    // yield call(loadUserAPI); // call은 동기적 요청, fork는 비동기적 요청
    const result = yield call(loadUserAPI);
    console.log(result);
    yield put({ // put은 dispatch와 동일
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
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
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadUser),
  ]);
}
