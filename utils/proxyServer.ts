import { cookies } from "next/headers";
import { URL, axiosServer } from "./api";
import { redirect } from "next/navigation";

export const userLoginServer = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) =>
  await axiosServer.post("/users/sign-in", {
    email,
    password,
  });

export const uploadAvatarUser = async (userId: string, formData: FormData) => {
  return await axiosServer.patch(`/users/update_avatar/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserServer = async () => {
  const access_token = cookies().get("access_token")?.value;

  return await axiosServer.get("/users", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getUsersServer = async (page: number, query: string) => {
  const access_token = cookies().get("access_token_admin")?.value;
  
  const res = await fetch(`${URL}/users/all?page=${page}&email=${query}`, {
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${access_token}`,
    // },
    next: { tags: ["admin-users"] },
  });

  return res.json();
};

export const deleteUserServer = async (
  email: FormDataEntryValue,
  user_id: FormDataEntryValue
) => await axiosServer.delete(`/users?email=${email}&user_id=${user_id}`);

export const getUserByIdServer = async (userId: string) => {
  return await axiosServer.get(`/users/${userId}`);
};

export const updateUserById = async (
  userId: FormDataEntryValue,
  body: FormDataEntryValue
) => await axiosServer.patch(`/users/update_user/${userId}`, body);

export const userSignUp = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue,
  username: FormDataEntryValue,
  phonenumber: FormDataEntryValue,
  system_role: FormDataEntryValue,
  address: FormDataEntryValue
) =>
  await axiosServer.post("/users/sign_up", {
    username,
    phonenumber,
    email,
    password,
    system_role,
    address,
  });

export const getApartmentDetailServer = async (apartmentId: string) => {
  const access_token = cookies().get("access_token")?.value;

  return await axiosServer.get(`/apartment/${apartmentId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getApartmentsServer = async (query: string, page: string) => {
  const res = await fetch(`${URL}/apartments/all?name=${query}&page=${page}`, {
    method: "GET",
    next: { tags: ["admin-apartments"] },
  });

  return res.json();

  // return await axiosServer.get(`/apartments/all?name=${query}&page=${page}`);
};

export const deleteApartmentServer = async (apartmentId: FormDataEntryValue) =>
  await axiosServer.delete(`/apartments/${apartmentId}`);

// contract
export const getContractsServer = async (query: string, page: number) =>
  await axiosServer.get(`/contracts/all?page=${page}`);

export const getApartmentComments = async (apartmentId: string) =>
  await axiosServer.get(`/apartmentComment/${apartmentId}`);

export const getTagsFilterServer = async () =>
  await axiosServer.get(`/tags/all`);

export const getContractsLatest = async () =>
  await axiosServer.get(`/contracts/latest`);

// statisticals

export const getAdminStaticticalsCommon = async () =>
  await axiosServer.get(`/statisticals/common/admin`);

export const getAdminStaticticalsChart = async () =>
  await axiosServer.get(`/statisticals/chart/admin`);

export const getCurrentUserServer = async () => {
  const access_token = cookies().get("access_token")?.value;
  
  if (!access_token) redirect("/admin/login");

  const res = await fetch(`http://127.0.0.1:4000/api/users/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
};

export const deleteContractServer = async (contract_id: string) => {
  return await axiosServer.delete(`/contracts/${contract_id}`);
};
