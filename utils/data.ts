import { IApartmentRead } from "./interface";

export const iconsFilterApartment: Record<string, string> = {
  villa: "/filter/villa.svg",
  Beach: "/filter/beach.svg",
  leaning_tower: "/filter/leaning_tower.svg",
  lake: "/filter/lake.svg",
  home_small: "/filter/home_small.svg",
  farm: "/filter/farm.svg",
  cave: "/filter/cave.svg",
  pool: "/filter/pool.svg",
  surfing: "/filter/surfing.svg",
  entertaiment: "/filter/entertaiment.svg",
  pictures: "/filter/pictures.svg",
};

export const iconAmenities: Record<string, string> = {
  air_conditioner: "/amenities/air_conditioner.svg",
  cammera: "/amenities/cammera.svg",
  desk: "/amenities/desk.svg",
  fridge: "/amenities/fridge.svg",
  kitchen: "/amenities/kitchen.svg",
  tv: "/amenities/TV.svg",
  washing_machine: "/amenities/washing_machine.svg",
  wifi: "/amenities/wifi.svg",
  clock: "/amenities/clock.svg",
  moon: "/amenities/moon.svg",
  more_people: "/amenities/more_people.svg",
  batchtub: "/amenities/batchtub.svg",
  parking_car: "/amenities/parking_car.svg",
  pool: "/filter/pool.svg",
  stove: "/amenities/stove.svg",
  backyard: "/amenities/backyard.svg",
};

export const APARTMENT_TYPE: Record<string, string> = {
  STUDIO: "Căn hộ Studio",
  HOUSE: "Nhà",
  CONDO: "Biệt Thự",
};

export const apartmentData: IApartmentRead[] = [
  {
    id: "apt_123456",
    desc: "A modern apartment located in the city center, close to major attractions.",
    img_room: "https://example.com/images/room1.jpg",
    price_per_day: 150,
    num_bedrooms: 2,
    num_bathrooms: 1,
    num_living_rooms: 1,
    name: "City Center Apartment",
    room: "Room A1",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-06-10T12:00:00Z",
    address: "123 Main St, City Center",
    total_people: 4,
    apartment_type: "Luxury",
    is_approved: true,
    images: [
      {
        id: "img_001",
        image_url: "https://example.com/images/livingroom.jpg",
        apartment_id: "123",
        created_at: new Date().toDateString(),
      },
      {
        id: "img_002",
        image_url: "https://example.com/images/kitchen.jpg",
        apartment_id: "123",
        created_at: new Date().toDateString(),
      },
    ],
    total_rating: 4.5,
  },
];
