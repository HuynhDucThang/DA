import { all } from 'redux-saga/effects';
import { watchLogin} from './sagas/authSaga';
import { watchGetCurrentUser } from './sagas/userSage';

export default function* rootSaga() {
  yield all([watchLogin(),  watchGetCurrentUser()]);
};