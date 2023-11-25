import axios from "axios";
import {
  axiosAuth,
  axiosAuthCookieMultiData,
  axiosNonAuth,
  axiosServer,
} from "./api";
import {
  IAmenityCreate,
  IApartCommentCreate,
  IApartmentCreate,
  IContractCreate,
  ITagCreate,
} from "./interface";

// ----------------------------- users ---------------------------------

export const userLogin = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) =>
  await axiosServer.post("/users/login", {
    email,
    password,
  });

export const getUser = async () => await axiosAuth.get("/users/");

export const getUsers = async () => await axiosAuth.get("/users/all");

export const getUserById = async (userId: string) =>
  await axiosAuth.get(`/users/${userId}`);

export const userSignUp = async (
  email: string,
  password: string,
  username: string,
  phonenumber: string
) =>
  await axiosNonAuth.post("/users/sign_up", {
    username,
    phonenumber,
    email,
    password,
    system_role: "RENTER",
  });

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
  await axiosAuth.patch(`/users/update_user/${userId}`, body);

export const uploadAvatar = async (userId: string, formData: FormData) =>
  await axiosAuthCookieMultiData.patch(
    `/users/update_avatar/${userId}`,
    formData
  );

// ------------------------------ apartment ---------------------------------

export const getApartmentByTagId = async (tagId: string) =>
  await axiosAuth.get(`/apartments/tag${tagId ? `?tag_id=${tagId}` : ""}`);

export const getApartmentDetail = async (apartmentId: string) =>
  await axiosAuth.get(`/apartments/${apartmentId}/apartment`);

export const createApartment = async (
  apartment: IApartmentCreate,
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
  params.set("apartment_type", apartment.apartment_type);

  return await axiosAuth.post(`/apartments?${params.toString()}`, formData);
};

export const updateApartment = async (
  apartmentId: string,
  apartment: IApartmentCreate
) => await axiosServer.patch(`/apartments/${apartmentId}`, apartment);

export const updateImagesApartment = async (
  apartmentId: string,
  formData: FormData
) =>
  await axiosAuthCookieMultiData.patch(
    `/apartments/upload/${apartmentId}`,
    formData
  );

export const deleteApartment = async (apartmentId: string) =>
  await axiosAuth.delete(`/apartments/${apartmentId}`);

export async function getApartmentsLocal(searchParams: any) {
  const params = new URLSearchParams();
  const addParamIfExist = (key: string, value: any) => {
    if (value) {
      params.set(key, value);
    }
  };

  Object.keys(searchParams).forEach((key) => {
    if (searchParams[key]) {
      const keyName = key === "tagId" ? "tag_id" : key;
      addParamIfExist(keyName, searchParams[key]);
    }
  });

  return await axiosAuth(`/apartments/tag?${params.toString()}`);
}

// ------------------------------- tags -------------------------------

export const getTagsFilter = async () => await axiosAuth.get(`/tags/all`);

export const createTag = async (apartment: ITagCreate) =>
  await axiosAuth.post("/tags", apartment);

export const UpdateTag = async (tagId: IApartmentCreate, tag: ITagCreate) =>
  await axiosAuth.patch(`/tags/${tagId}`, tag);

export const deleteTag = async (tagId: string) =>
  await axiosAuth.delete(`/tags/${tagId}`);

// ------------------------------- contracts -------------------------------

export const getContracts = async (query: string, page: number) =>
  await axiosAuth.get(`/contracts/all`);

export const getContractsTrip = async (userId: string) =>
  await axiosAuth.get(`/contracts?id=${userId}&type_id=USER_ID`);

export const createContract = async (contract: IContractCreate) =>
  await axiosAuth.post("/contracts", contract);

export const updateContract = async (
  contractId: string,
  contract: IContractCreate
) => await axiosAuth.patch(`/contracts/${contractId}`, contract);

export const deleteContract = async (contractId: string) =>
  await axiosAuth.delete(`/contracts/${contractId}`);

// ------------------------------- amenities -------------------------------

export const getAmenities = async () => await axiosAuth.get(`/amenities/all`);

export const createAmenity = async (apartment: IAmenityCreate) =>
  await axiosAuth.post("/amenities", apartment);

export const updateAmenity = async (
  AmenityId: IApartmentCreate,
  amenity: IAmenityCreate
) => await axiosAuth.patch(`/amenities/${AmenityId}`, amenity);

export const deleteAmenity = async (AmenityId: string) =>
  await axiosAuth.delete(`/amenities/${AmenityId}`);

// comment

export const createApartmentComment = async (comment: IApartCommentCreate) =>
  await axiosServer.post("/apartmentComment", comment);
