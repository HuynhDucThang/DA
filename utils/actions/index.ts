"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  deleteApartmentServer,
  deleteContractServer,
  deleteUserServer,
  updateUserById,
  uploadAvatarUser,
  userLoginServer,
  userSignUp,
} from "../proxyServer";
import { createApartmentComment, updateApartment } from "../proxy";
import { IApartCommentCreate, IApartmentCreate } from "../interface";
import { axiosAuthCookieMultiData, axiosServer } from "../api";

export const loginAdmin = async (prevState: any, formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    const { data } = await userLoginServer(email, password);
    const hartTime = 30 * 60 * 1000;
    const twoDay = 2 * 24 * 60 * 60 * 1000;

    cookies().set("access_token_admin", data?.data?.access_token, {
      expires: Date.now() + hartTime,
    });
    cookies().set("refresh_token_admin", data?.data?.refresh_token, {
      expires: Date.now() + twoDay,
    });

    return "Success";
  } catch (err: any) {
    return err?.response?.data?.detail ?? "Đăng nhập thất bại!";
  }
};

export const deleteUser = async (formData: FormData) => {
  const { email, user_id } = Object.fromEntries(formData);

  try {
    await deleteUserServer(email, user_id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/admin/dashboard/users");
};

export const deleteContractAction = async (formData: FormData) => {
  const { contract_id } = Object.fromEntries(formData);

  try {
    await deleteContractServer(contract_id as string);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/admin/dashboard/contracts");
};

export const updateUser = async (formData: FormData) => {
  const { id, username, email, password, phone, system_role, address } =
    Object.fromEntries(formData);

  try {
    const updateFields: any = {
      username,
      email,
      password,
      phone,
      system_role,
      address,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await updateUserById(id, updateFields);
  } catch (err: any) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidateTag("admin-users");
  redirect("/admin/dashboard/users");
};

export const addUser = async (prevState: any, formData: FormData) => {
  const { username, email, password, phonenumber, system_role, address } =
    Object.fromEntries(formData);

  try {
    await userSignUp(
      email,
      password,
      username,
      phonenumber,
      system_role,
      address
    );
  } catch (err) {
    console.log(err);
    return "Không thể tạo người dùng";
  }

  revalidateTag("admin-users");
  redirect("/admin/dashboard/users");
};

//

export const addApartmentAction = async (formData: FormData) => {
  const {
    id,
    banner,
    desc,
    name,
    num_bathrooms,
    num_bedrooms,
    num_living_rooms,
    num_toilets,
    price_per_day,
    room,
  } = Object.fromEntries(formData);

  const apartmentId = id as string;

  try {
    const updateFields: any = {
      banner,
      desc,
      name,
      num_bathrooms,
      num_bedrooms,
      num_living_rooms,
      num_toilets,
      price_per_day,
      room,
    };
    await updateApartment(apartmentId, updateFields);
  } catch (err: any) {
    console.log(err);
    throw new Error("Failed to update user!");
  }
};

export const updateApartmentAction = async (formData: FormData) => {
  const {
    id,
    desc,
    name,
    num_bathrooms,
    num_bedrooms,
    num_living_rooms,
    price_per_day,
    total_people,
    is_approved,
  } = Object.fromEntries(formData);

  const apartmentId = id as string;

  const updateFields: any = {
    // banner,
    desc,
    name,
    num_bathrooms,
    num_bedrooms,
    num_living_rooms,
    price_per_day,
    total_people,
    is_approved,
  };

  Object.keys(updateFields).forEach(
    (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
  );

  try {
    await updateApartment(apartmentId, updateFields);
  } catch (err) {
    console.log(err);
    return "Không thể cập nhật";
  }

  revalidateTag("admin-apartments");
  redirect("/admin/dashboard/apartments");
};

export const deleteApartment = async (formData: FormData) => {
  const { apartmentId } = Object.fromEntries(formData);

  try {
    await deleteApartmentServer(apartmentId);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete apartment!");
  }

  revalidatePath("/admin/dashboard/apartments");
};

export const updateAvatarUserAction = async (
  userId: string,
  formData: FormData
) => {
  try {
    const { data } = await uploadAvatarUser(userId, formData);

    revalidatePath(`/admin/dashboard/users`);
    redirect(`/admin/dashboard/users`);
  } catch (error: any) {
    return { errMsg: error.message };
  }
};

export const createApartmentCommentServer = async (
  apartmentComment: IApartCommentCreate
) => {
  try {
    /*
        const user = await getUserServer()
        throw new Error("Unauthorization")
      */
    await createApartmentComment(apartmentComment);
    revalidateTag("apartment-comment");
    
  } catch (error: any) {
    return { errMsg: error.message };
  }
};

export const updateImagesApartmentAction = async (
  apartmentId: string,
  formData: FormData
) => {
  await axiosServer.patch(`/apartments/upload/${apartmentId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  revalidateTag("admin-apartments");
  redirect("/admin/dashboard/apartments");
};
