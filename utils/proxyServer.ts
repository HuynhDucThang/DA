import { cookies } from "next/headers";
import { axiosServer } from "./api";

export const userLoginServer = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) =>
  await axiosServer.post("/users/login", {
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

  return await axiosServer.get(`/users/all`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
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
  system_role: FormDataEntryValue
) =>
  await axiosServer.post("/users/sign_up", {
    username,
    phonenumber,
    email,
    password,
    system_role,
  });

export const getApartmentDetailServer = async (apartmentId: string) => {
  const access_token = cookies().get("access_token_admin")?.value;

  return await axiosServer.get(`/apartments/${apartmentId}/apartment`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getApartments = async (query: string, page: string) =>
  await axiosServer.get(`/apartments/all`);

export const deleteApartmentServer = async (apartmentId: FormDataEntryValue) =>
  await axiosServer.delete(`/apartments/${apartmentId}`);

// contract
export const getContractsServer = async (query: string, page: number) =>
  await axiosServer.get(`/contracts/all`);

export const getApartmentComments = async (apartmentId: string) =>
  await axiosServer.get(`/apartmentComment/${apartmentId}`);

export const getTagsFilterServer = async () =>
  await axiosServer.get(`/tags/all`);
