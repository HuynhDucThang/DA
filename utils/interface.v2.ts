import { IUser } from "./interface";

export interface IResponseApartmentAmenity {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

export interface IResponseApartmentTag {
  _id: string;
  name: string;
  icon: string;
}

export interface IResponseRatingApartment {
  cleanliness: number;
  accuracy: number;
  check_in: number;
  communication: number;
  location: number;
  value: number;
  totalScope: number;
}

export interface IResponseApartment {
  amentities: (IResponseApartmentAmenity | string)[];
  description: string;
  images: string[];
  isApproved: boolean;
  name: string;
  address: string;
  rating: IResponseRatingApartment;
  pricePerNight: string;
  totalPeople: number;
  rooms: { livingRoom: number; bedRoom: number; bathRoom: number };
  tags: (IResponseApartmentTag | string)[];
  _id: string;
  type: string;
  owner: IUser;
  createAt: Date;
  updatedAt: Date;
}

export interface IResponseApartmentComment {
  _id: string;
  parentComment?: IResponseApartmentComment;
  apartment: string | IResponseApartment;
  author: IUser;
  content: string;
  rating: IResponseRatingApartment;
  created_at: Date;
}

export interface IResponseApartmentComment {
  _id: string;
  apartmentId: string;
  content: string;
  author: IUser;
  rating: IResponseRatingApartment;
  children: IResponseApartmentComment[];
}

export interface IRequestApartmentComment
  extends Pick<IResponseApartmentComment, "content" | "rating"> { }

export interface IResponseApartmentContract {
  _id: string;
  apartment: IResponseApartment;
  payer: IUser;
  startDate: Date;
  endDate: Date;
  information: {
    totalMember: number;
    totalPrice: number;
  };
  status: string;
  isCheckOut: boolean;
  content: string;
  createdAt: Date;
}

export interface IRequestCreateContract {
  content?: string;
  startDate: Date;
  endDate: Date;
  status?: string;
  information: {
    totalMember: number;
    totalPrice: number;
  };
}

export interface IOverViewStatistics {
  title: string;
  value: number;
  change: number;
}

export interface IChartStatistics {
  title: number;
  totalContract: number;
  totalUser: number;
}

export type APARTMENT_TYPE = "STUDIO" | "HOUSE" | "CONDO";

export interface IRequestCreateApartment {
  name: string;
  desc: string;
  tags: string[];
  amentities: string[];
  pricePerNight: string;
  address: number;
  type: APARTMENT_TYPE;
}

export interface IRequestUpdateApartment {
  name?: string;
  desc?: string;
  tags?: string[];
  amentities?: string[];
  pricePerNight?: string;
  address?: number;
  type?: APARTMENT_TYPE;
  isApproved?: boolean;
}
