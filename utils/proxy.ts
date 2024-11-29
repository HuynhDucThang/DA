import axios from "axios";
import {
  axiosAuth,
  axiosAuthCookieMultiData,
  axiosNonAuth,
  axiosServer,
} from "./api";
import {
  IAmenityCreate,
  IApartmentCreate,
  IContractCreate,
  IMessageCreate,
  IRoomCreate,
  ITagCreate,
} from "./interface";
import { getCookie } from "./helpers/common";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import {
  IRequestApartmentComment,
  IRequestCreateContract,
  IRequestUpdateApartment,
} from "./interface.v2";

// ----------------------------- users ---------------------------------

export const userLogin = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) =>
  await axiosNonAuth.post("/users/sign-in", {
    email,
    password,
  });

export const verifyUser = async (userId: string, code: string) =>
  await axiosNonAuth.put(`/users/verify-account?id=${userId}&code=${code}`);

export const getUser = async () => await axiosAuth.get("/users/me");

export const getUserById = async (userId: string) =>
  await axiosAuth.get(`/users/${userId}`);

export const userSignUp = async (body: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: string;
  address?: string;
}) => await axiosNonAuth.post("/users/sign-up", body);

export const userRefreshToken = async (refresh_token: string) =>
  await axiosAuth.post(
    "/users/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    }
  );

export const updateUser = async (userId: string, body: any) =>
  await axiosAuth.patch(`/users/update/${userId}`, body);

export const updatePassword = async (email: string, password: any) =>
  await axiosAuth.put(`/users/change-password/`, {
    email,
    password,
  });

export const uploadAvatar = async (userId: string, formData: FormData) =>
  await axiosAuthCookieMultiData.patch(`/users/upload/${userId}`, formData);

export const getUsers = async (searchParams: { q: string; page: number }) => {
  const params = new URLSearchParams();
  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key as keyof typeof searchParams];
    if (value) {
      params.set(key, value.toString());
    }
  });

  return await axiosAuth.get(`/users/?${params.toString()}`);
};

export const deleteUser = async (userId: string) =>
  await axiosAuth.delete(`/users/${userId}/`);

// ------------------------------ apartment ---------------------------------

export const getApartments = async (searchParams: any) => {
  const params = new URLSearchParams();
  const addParamIfExist = (key: string, value: any) => {
    if (value) {
      params.set(key, value);
    }
  };

  Object.keys(searchParams).forEach((key) => {
    if (searchParams[key]) {
      addParamIfExist(key, searchParams[key]);
    }
  });

  return await axiosAuth.get(`/apartment/?${params.toString()}`);
};

export const getApartmentDetail = async (apartmentId: string) =>
  await axiosAuth.get(`/apartment/${apartmentId}`);

export const createApartment = async (
  apartment: IApartmentCreate, // Assuming IApartmentCreate is an interface or type
  formData: any
) => {
  const params = new URLSearchParams();
  params.set("name", `${apartment.name}`);
  params.set("desc", `${apartment.desc}`);
  params.set("room", `${apartment.name}`);
  params.set("price_per_day", `${apartment.price_per_day}`);
  params.set("num_bedrooms", `${apartment.num_bedrooms}`);
  params.set("num_living_rooms", `${apartment.num_living_rooms}`);
  params.set("num_bathrooms", `${apartment.num_bathrooms}`);
  params.set("total_people", `${apartment.total_people}`);
  params.set("address", apartment.address);
  params.set("city", apartment.city);
  params.set("is_approved", `${false}`);
  params.set("apartment_type", apartment.apartment_type);

  return await axiosAuth.post(`/apartments?${params.toString()}`, formData);
};

export const createApartmentAdmin = async (formData: FormData) => {
  return await axiosAuth.post(`/apartment`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateApartment = async (
  apartmentId: string,
  apartment: IRequestUpdateApartment
) => await axiosAuth.patch(`/apartment/${apartmentId}`, apartment);

export const updateImagesApartment = async (
  apartmentId: string,
  formData: FormData
) => {
  await axiosAuthCookieMultiData.patch(
    `/apartments/upload/${apartmentId}`,
    formData
  );

  revalidateTag("admin-apartments");
  redirect("/admin/dashboard/apartments");
};

export const updateImagesApartmentUser = async (
  apartmentId: string,
  formData: FormData
) => {
  await axiosAuthCookieMultiData.patch(
    `/apartments/upload/${apartmentId}`,
    formData
  );
};

export const deleteApartment = async (apartmentId: string) =>
  await axiosAuth.delete(`/apartment/${apartmentId}`);

export async function getApartmentsLocal(searchParams: any) {
  const params = new URLSearchParams();
  const addParamIfExist = (key: string, value: any) => {
    if (value) {
      params.set(key, value);
    }
  };

  Object.keys(searchParams).forEach((key) => {
    if (searchParams[key]) {
      addParamIfExist(key, searchParams[key]);
    }
  });

  return await axiosAuth(`/apartments/tag?${params.toString()}`);
}

// ------------------------------- tags -------------------------------

export const getTagsFilter = async () => await axiosAuth.get(`/apartment-tag`);

export const createTag = async (apartment: ITagCreate) =>
  await axiosAuth.post("/tags", apartment);

export const UpdateTag = async (tagId: IApartmentCreate, tag: ITagCreate) =>
  await axiosAuth.patch(`/tags/${tagId}`, tag);

export const deleteTag = async (tagId: string) =>
  await axiosAuth.delete(`/tags/${tagId}`);

// ------------------------------- contracts -------------------------------

export const getContractsTrip = async (userId: string) =>
  await axiosAuth.get(`/contracts?id=${userId}&type_id=USER_ID`);

export const createContract = async (
  apartmentId: string,
  contract: IRequestCreateContract
) => await axiosAuth.post(`/contract/${apartmentId}`, contract);

export const updateContract = async (contractId: string, contract: any) =>
  await axiosAuth.patch(`/contract/${contractId}`, contract);

export const deleteContract = async (contractId: string) =>
  await axiosAuth.delete(`/contract/${contractId}`);

export const getContracts = async (params : any) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    const value = params[key as keyof typeof params];
    if (value) searchParams.set(`${key}`, value);
  });
  return await axiosAuth.get(`/contract/?${searchParams.toString()}`);
};

// ------------------------------- amenities -------------------------------

export const getAmenities = async () =>
  await axiosAuth.get(`/apartment-amenity`);

export const createAmenity = async (apartment: IAmenityCreate) =>
  await axiosAuth.post("/amenities", apartment);

export const updateAmenity = async (
  AmenityId: IApartmentCreate,
  amenity: IAmenityCreate
) => await axiosAuth.patch(`/amenities/${AmenityId}`, amenity);

export const deleteAmenity = async (AmenityId: string) =>
  await axiosAuth.delete(`/amenities/${AmenityId}`);

// comment
export const getCommentByApartment = async (apartmentId: string) =>
  await axiosAuth.get(`/comment/?apartmentId=${apartmentId}`);

export const createApartmentComment = async (
  apartmentId: string,
  comment: IRequestApartmentComment
) => await axiosAuth.post(`/comment/${apartmentId}`, comment);

// chat
export const getRoomUsers = async (sender_id: string, receiver_id: string) =>
  await axiosAuth.get(
    `/rooms/users?sender_id=${sender_id}&receiver_id=${receiver_id}`
  );

export const getConversationsByUser = async (userId: string) =>
  await axiosAuth.get(`/rooms?type_query=USER_ID&id=${userId}`);

export const getMessageRoom = async (roomId: string) =>
  await axiosAuth.get(`/rooms?type_query=ROOM_ID&id=${roomId}`);

export const createMessage = async (comment: IMessageCreate) =>
  await axiosAuth.post("/messages", comment);

export const createRoomChat = async (roomData: IRoomCreate) =>
  await axiosAuth.post("/rooms", roomData);

export const redirectToVnPay = async (
  amount: number,
  redirect_return: string,
  contractId: string
) =>
  await axiosAuth.post("/payments/redirect_to_vn_pay", {
    amount,
    redirect_return,
    order_id: contractId,
  });

export const getOverviewStatistics = async () =>
  await axiosAuth.get(`/statistic/overview`);

export const getChartStatistics = async () =>
  await axiosAuth.get(`/statistic/chart`);
