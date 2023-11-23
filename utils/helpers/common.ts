import { format } from "date-fns";
import Cookies from "js-cookie";

export function setCookie(key: string, value: string, options?: object) {
  Cookies.set(key, value, options);
}

export function getCookie(key: string): string | undefined {
  return Cookies.get(key);
}

export function removeCookie(key: string): void {
  Cookies.remove(key);
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const updateMutilpleSearchParams = (paramsToUpdate: any) => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(paramsToUpdate).forEach(([type, value]: any) => {
    searchParams.set(type, value);
  });

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const clearAllSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);

  // Xóa tất cả các tham số tìm kiếm
  searchParams.forEach((value, key) => {
    searchParams.delete(key);
  });

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const clearSearchParams = (paramsToDelete: string[]) => {
  const searchParams = new URLSearchParams(window.location.search);

  paramsToDelete.forEach((param) => {
    searchParams.delete(param);
  });

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const handleConvertDate = (
  date: Date,
  formatDate: string = "dd/MM/yyyy 'lúc' HH:mm"
) => {
  const startDate = new Date(date);
  const startFormatted = format(startDate, formatDate);

  const result = `${startFormatted}`;
  return result;
};

import { toast } from "react-toastify";

type TOAST_TYPE = "success" | "error" | "warn";

export const showToast = (message: string, type = "success" as TOAST_TYPE) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      break;

    case "warn":
      toast.warn(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      break;
    default:
      break;
  }
};

