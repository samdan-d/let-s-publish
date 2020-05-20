import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
  auth,
} from "../../firebase/firebase";
import {
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER
} from "constants/ActionTypes";
import {showAuthMessage, userSignInSuccess, userSignOutSuccess, userSignUpSuccess} from "../../appRedux/actions/Auth";
import {
  userFacebookSignInSuccess,
  userGithubSignInSuccess,
  userGoogleSignInSuccess,
  userTwitterSignInSuccess
} from "../actions/Auth";
import {loginRequest, registerRequest} from "api/profile";

const createUserWithEmailPasswordRequest = async (username, password, repeat_password) =>
  await registerRequest(username, password, repeat_password)
    .then(res => res.data)
    .catch(error => ({message: error?.errmsg}));

const signInUserWithEmailPasswordRequest = async (username, password) =>
  await loginRequest(username, password)
    .then(authUser => authUser.data)
    .catch(error => ({message: error?.errmsg}));

function* createUserWithEmailPassword({payload}) {
  const {username, password, repeat_password} = payload;
  try {
    const tokens = yield call(createUserWithEmailPasswordRequest, username, password, repeat_password);
    if (tokens.message) {
      yield put(showAuthMessage(tokens.message));
    } else {
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('user_id', tokens.access_token);
      localStorage.setItem('user', JSON.stringify(tokens.user));
      yield put(userSignUpSuccess(tokens.user));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signInUserWithEmailPassword({payload}) {
  const {username, password} = payload;
  try {
    const tokens = yield call(signInUserWithEmailPasswordRequest, username, password);
    if (tokens.message) {
      yield put(showAuthMessage(signInUser.message));
    } else {
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('user_id', tokens.access_token);
      localStorage.setItem('user', JSON.stringify(tokens.user));
      yield put(userSignInSuccess(tokens.user));
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* signOut() {
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    yield put(userSignOutSuccess());
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* createUserAccount() {
  yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(signInUser),
    fork(createUserAccount),
    fork(signOutUser)]);
}
