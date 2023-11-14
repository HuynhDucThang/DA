export interface ITypeApartment {
  icon: string;
  title: string;
}

export interface IUser {
  id: string;
  avatar: string;
  username: string;
  phonenumber: string;
  password: string;
  email: string;
  system_role: string;
  isVerify: boolean;
  created_at: string;
  updated_at: string;
  verification_code: string;
}

// apartmetn
export interface IApartmentCreate {
  name: string;
  desc: string;
  room: string;
  price_per_day: number;
  num_bedrooms: number;
  num_living_rooms: number;
  num_bathrooms: number;
  num_toilets: number;
  total_people: number;
  rate: number;
}

export interface IApartmentRead {
  id: string;
  desc: string;
  img_room: string;
  price_per_day: number;
  num_bedrooms: number;
  num_bathrooms: number;
  num_living_rooms: number;
  num_toilets: number;
  name: string;
  room: string;
  created_at: string;
  updated_at: string;
  rate: number;
  total_people: number;
  images: IImagesApartment[];
}

export interface IApartmentDetail extends IApartmentRead {
  amenities: IAmenityRead[];
  apartment_contract: IApartmentContract[];
  apartment_tags: {
    tag_id: string;
    id: string;
    apartment_id: string;
    tag: ITagRead;
  }[];
}

export interface IImagesApartment {
  id: string;
  apartment_id: string;
  created_at: string;
  image_url: string;
}

export interface IApartmentContract {
  content: string;
  id: string;
  end_date: string;
  start_date: string;
  apartment_id: string;
  user_id: string;
}

// tags
export interface ITagCreate {
  name: string;
  desc: string;
}

export interface ITagRead {
  id: string;
  name: string;
  desc: string;
}

// contract

export interface IContractCreate {
  content: string;
  user_id: string;
  apartment_id: string;
  start_date: Date;
  end_date: Date;
  total_amount: number;
  num_of_people: number;
}

// amenity

export interface IAmenityCreate {
  name: string;
  desc: string;
}

export interface IAmenityRead {
  id: string;
  name: string;
  desc: string;
}

//
export interface IApartCommentCreate {
  user_id: string;
  apartment_id: string;
  text: string;
  rate_location: number;
  rate_interior: number;
  rate_amenities: number;
  rate_price: number;
}

export interface IComment {
  id: string;
  created_at: string;
  rate_location: number;
  rate_interior: number;
  user_id: string;
  apartment_id: string;
  text: string;
  rate_amenities: number;
  rate_price: number;
  total_rate: number;
  user: IUser;
}

export interface IStatisticalComment {
  total_rate_location: number;
  total_rate_price: number;
  total_rate_amenities: number;
  total_rate_interior: number;
}

export interface IApartmentComment extends IStatisticalComment {
  comments: IComment[];
}
