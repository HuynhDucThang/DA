import store from "@/redux/store";
import axios from "axios";
import { currentUserLogout } from "@/redux/slices/userSlice";
import { setToken, userLogout } from "@/redux/slices/authSlice";
import { getCookie, setCookie } from "./helpers/common";
import { userRefreshToken } from "./proxy";

export const baseURL = "http://localhost:4000/api";
export const URL = "http://127.0.0.1:4000/api";

let isRefreshing: boolean = false;
let refreshSubscribers: any[] = [];

interface ApiResponse<T> {
  detail?: {
    status_code: number;
    message: string;
  };
}

export const axiosServer = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosNonAuth = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuthCookieMultiData = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const axiosUnZip = axios.create({
  baseURL,
  headers: {
    responseType: "arraybuffer",
  },
});

const setAuthToken = (token: string) => {
  axiosAuth.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axiosAuthCookieMultiData.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const saveAuthToken = (name: string, token: string) => {
  if (name === "access_token") {
    const currentTime = new Date();
    const expirationTime = new Date(currentTime.getTime() + 30 * 60 * 1000);

    setCookie(name, token, { expires: expirationTime });
    setAuthToken(token);
  } else if (name === "refresh_token") {
    setCookie(name, token, { expires: 2 });
  }
};

const loadAuthToken = () => {
  const token = getCookie("access_token");

  if (token) {
    setAuthToken(token);
  }
};

loadAuthToken();

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    const refresh_token = getCookie("refresh_token");

    if (!refresh_token) {
      console.log("!refresh_token");
      if (store?.getState()?.user?.currentUser?._id) {
        store.dispatch(userLogout());
        store.dispatch(currentUserLogout());
      }
      error.response.data.detail.message = null;
    } else if (
      refresh_token &&
      error.response?.data.detail.message === "MISSING_TOKEN_ERROR" &&
      !originalRequest.isRetryAttempt
    ) {
      const retryOrigReq = new Promise((resolve) => {
        subscribeTokenRefresh(async (token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          const response = await axiosAuth(originalRequest);
          resolve(response);
        });
      });

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data } = await userRefreshToken(refresh_token);
          saveAuthToken("access_token", data.data.access_token);
          saveAuthToken("refresh_token", data.data.refresh_token);

          originalRequest.isRetryAttempt = true;
          isRefreshing = false;
          store.dispatch(setToken(data.data.access_token));
          onRrefreshed(data.data.access_token);
        } catch (refreshError: any) {
          store.dispatch(userLogout());
          store.dispatch(currentUserLogout());
          refreshError.response.data.detail.message = null;
        }
      }

      return retryOrigReq;
    }

    return Promise.reject(error);
  }
);

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRrefreshed = (token: string) => {
  refreshSubscribers.map((cb) => {
    console.log("call");

    return cb(token);
  });
};
