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
