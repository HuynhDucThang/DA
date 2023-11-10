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
) =>
  await axiosServer.patch(`/users/${userId}`, {
    body,
  });

export const userSignUp = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue,
  username: FormDataEntryValue,
  phonenumber: FormDataEntryValue
) =>
  await axiosServer.post("/users/sign_up", {
    username,
    phonenumber,
    email,
    password,
  });
