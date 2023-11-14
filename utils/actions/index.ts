"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  deleteApartmentServer,
  deleteUserServer,
  updateUserById,
  uploadAvatarUser,
  userLoginServer,
  userSignUp,
} from "../proxyServer";
import { createApartmentComment, updateApartment } from "../proxy";
import { IApartCommentCreate, IApartmentCreate } from "../interface";

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

export const updateUser = async (formData: FormData) => {
  const { id, username, email, password, phone, system_role } =
    Object.fromEntries(formData);

  try {
    const updateFields: any = {
      username,
      email,
      // password,
      phone,
      system_role,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await updateUserById(id, updateFields);
    revalidatePath(`/admin/dashboard/users/[userId]`, "page");
  } catch (err: any) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  // redirect("/admin/dashboard/users");
};

export const addUser = async (prevState: any, formData: FormData) => {
  const { username, email, password, phonenumber, system_role } =
    Object.fromEntries(formData);

  try {
    await userSignUp(email, password, username, phonenumber, system_role);
  } catch (err) {
    console.log(err);
    return "Không thể tạo người dùng";
  }

  // revalidatePath("/admin/dashboard/users");
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
    banner,
    desc,
    name,
    num_bathrooms,
    num_bedrooms,
    num_living_rooms,
    num_toilets,
    price_per_day,
    total_people,
  } = Object.fromEntries(formData);

  const apartmentId = id as string;

  const updateFields: any = {
    // banner,
    desc,
    name,
    num_bathrooms,
    num_bedrooms,
    num_living_rooms,
    num_toilets,
    price_per_day,
    total_people,
  };

  Object.keys(updateFields).forEach(
    (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]
  );

  try {
    await updateApartment(apartmentId, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath(`/admin/dashboard/apartments/[apartmentId]`, "page");
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
    await uploadAvatarUser(userId, formData);
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
    revalidatePath(`/apartment/[apartmentId]`, "page");
  } catch (error: any) {
    return { errMsg: error.message };
  }
};
