import { saveAuthToken } from "@/utils/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  userLoginFulfill,
  userLoginReject,
  userLogout,
} from "../slices/authSlice";
import { userLogin } from "@/utils/proxy";
import { removeCookie, showToast } from "@/utils/helpers/common";

interface IUser {
  email: string;
  password: string;
}

function* workUserLogin(action: PayloadAction<IUser>): any {
  try {
    const { data } = yield call(
      userLogin,
      action.payload.email,
      action.payload.password
    );
    yield call(saveAuthToken, "access_token", data.token);
    // yield call(saveAuthToken, "refresh_token", data.data.refresh_token);

    yield put(userLoginFulfill(data.token));
    yield call(showToast, "Đăng nhập thành công");
  } catch (error: any) {
    yield put(userLoginReject(error.response?.data?.error ?? "Server Error"));

    yield call(
      showToast,
      `Đăng nhập thất bại ${error.response?.data?.error}`,
      "error"
    );
  }
}

function* logout() {
  yield put(userLogout());
  yield call(removeCookie, "refresh_token");
  yield call(removeCookie, "access_token");
}

export function* watchLogin() {
  yield takeLatest("auth/userLoginPending", workUserLogin);
}

// export function* watchLogout() {
//   yield takeLatest("auth/logout", logout);
// }
