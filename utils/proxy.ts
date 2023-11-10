import { axiosAuth, axiosNonAuth, axiosServer } from "./api";
import {
  IAmenityCreate,
  IApartmentCreate,
  IContractCreate,
  ITagCreate,
} from "./interface";

// ----------------------------- users ---------------------------------

export const getUser = async () => await axiosAuth.get("/users/");

export const getUsers = async () => await axiosAuth.get("/users/all");

export const userLogin = async (
  email: FormDataEntryValue,
  password: FormDataEntryValue
) =>
  await axiosServer.post("/users/login", {
    email,
    password,
  });

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

export const deleteUser = async (email: string) =>
  await axiosNonAuth.delete("/users/sign_up", {});

// ------------------------------ apartment ---------------------------------

export const getApartmentByTagId = async (tagId: string) =>
  await axiosAuth.get(`/apartments/tag${tagId ? `?tag_id=${tagId}` : ""}`);

export const getApartmentDetail = async (apartmentId: string) =>
  await axiosAuth.get(`/apartments/${apartmentId}/apartment`);

export const createApartment = async (apartment: IApartmentCreate) =>
  await axiosAuth.post("/apartments", apartment);

export const updateApartment = async (
  apartmentId: string,
  apartment: IApartmentCreate
) => await axiosAuth.patch(`/apartments/${apartmentId}`, apartment);

export const deleteApartment = async (apartmentId: string) =>
  await axiosAuth.delete(`/apartments/${apartmentId}`);

// ------------------------------- tags -------------------------------

export const getTagsFilter = async () => await axiosAuth.get(`/tags/all`);

export const createTag = async (apartment: ITagCreate) =>
  await axiosAuth.post("/tags", apartment);

export const UpdateTag = async (tagId: IApartmentCreate, tag: ITagCreate) =>
  await axiosAuth.patch(`/tags/${tagId}`, tag);

export const deleteTag = async (tagId: string) =>
  await axiosAuth.delete(`/tags/${tagId}`);

// ------------------------------- contracts -------------------------------

export const getContracts = async () => await axiosAuth.get(`/contracts/all`);

export const getContractByUserId = async (userId: string) =>
  await axiosAuth.get(`/contracts/${userId}`);

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
