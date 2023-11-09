export interface ITypeApartment {
  icon: string;
  title: string;
}

export interface IUser {
  id: string;
  avatar: string;
  username: string;
  phone: string;
  password: string;
  email: string;
  system_role: string;
}

// apartmetn
export interface IApartmentCreate {
  name: string;
  desc: string;
  banner: string;
}

export interface IApartmentRead {
  id: string;
  desc: string;
  img_room: string;
  price_per_day: number;
  num_bedrooms: number;
  num_bathrooms: number;
  name: string;
  room: string;
  created_at: string;
  updated_at: string;
  num_living_rooms: number;
  num_toilets: number;
  rate: number;
}

export interface IApartmentDetail extends IApartmentRead {
  amenities: IAmenityRead;
  apartment_contract: IApartmentContract[];
  apartment_tags: {
    tag_id: string;
    id: string;
    apartment_id: string;
    tag: ITagRead;
  };
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
  name: string;
  desc: string;
  userId: string;
  apartmentId: string;
  start_date: string;
  end_date: string;
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
