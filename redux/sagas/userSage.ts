import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCurrentUserFulfill,
  getCurrentUserReject,
} from "../slices/userSlice";
import { removeCookie } from "@/utils/helpers/common";
import { getUser } from "@/utils/proxy";

function* workGetCurrentUser(): any {
  try {
    const { data } = yield call(getUser);
    yield put(getCurrentUserFulfill({ ...data.data }));
  } catch (error: any) {
    removeCookie("access_token");
    yield put(
      getCurrentUserReject(error.response?.data?.error ?? "Server Error")
    );
  }
}

export function* watchGetCurrentUser() {
  yield takeLatest("user/getCurrentUserPending", workGetCurrentUser);
}
