"use client";

import BtnSubmit from "@/components/common/button/btnSubmit";
import PhotoPreview from "@/components/pages/admin/dashboard/apartments/photoPreview";
import styles from "@/components/pages/admin/dashboard/apartments/singleApartment.module.css";
import { APARTMENT_TYPE, CITY } from "@/utils/enum";
import { showToast } from "@/utils/helpers/common";
import { IApartmentCreate } from "@/utils/interface";
import { createApartment, updateImagesApartment } from "@/utils/proxy";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const SingleApartmentPage = () => {
  const [apartmentCreate, setApartmentCreate] = useState<IApartmentCreate>({
    name: "",
    desc: "",
    room: "0",
    address: "",
    price_per_day: 0,
    num_bedrooms: 0,
    num_bathrooms: 0,
    num_living_rooms: 0,
    total_people: 0,
    city: "",
    apartment_type: "",
  });

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Hàm xử lý sự kiện thay đổi dropdown
  const handleDropdownChange = (event : ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedValues);
  };

  const tag_ids = [
    "4a7053c9-007b-411d-a07e-16ad51daf4eb",
    "f18ae502-a1a0-4e7a-8ef9-c6429ba616b0",
    "7db6bed0-fc29-478b-b0eb-9e37da770ae1",
    "c1a982f0-00b7-496b-b370-068cf903d5a0",
  ];

  const amenities_ids = [
    "2a388ab3-5f82-4245-b7c6-6bfb03b0c5d9",
    "fe2675c0-a162-411d-8723-4659f3d0637e",
    "a9c1c81f-8e81-4c95-9deb-28707ab62869",
    "fb2a25a2-12ef-4657-a9fe-bf9a7bd8fa62",
    "b7762425-5c07-4679-801f-efb4bbd5309f",
  ];

  const router = useRouter();

  const [images, setImages] = useState<any[]>([]);

  const handleOnchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setApartmentCreate((prevApartmentCreate) => ({
      ...prevApartmentCreate,
      [name]: value,
    }));
  };

  const handleDelete = (index: number) => {
    const newImages = images.filter((_, ind) => ind !== index);
    setImages(newImages);
  };

  const handleUploadFiles = (e: any) => {
    const files = e.target.files ?? [];
    setImages((pre) => [...Object.values(files), ...pre]);
  };

  const handleCreateApartment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (images.length < 5) {
      showToast("Phải có nhiều hơn 5 ảnh", "warn");
      return;
    }

    const formData = new FormData();

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const { data } = await createApartment(apartmentCreate, {
        tag_ids,
        amenities: amenities_ids,
      });
      const res = await updateImagesApartment(data?.id, formData);

      showToast("Thành công");
      router.push("/admin/dashboard/apartments");
    } catch (error) {
      console.log(error);
      showToast("Lỗi", "error");
    }
  };

  return (
    <div className={styles.container}>
      {/* left */}
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={`/avatar.png`} alt="" fill />
        </div>
        <div className="flex">
          {images.length &&
            images.map((img, index) => (
              <PhotoPreview
                key={index}
                url={URL.createObjectURL(img)}
                onDelete={() => handleDelete(index)}
              />
            ))}
        </div>
        <input
          type="file"
          accept=".png, .jpg"
          multiple
          onChange={handleUploadFiles}
        />
      </div>

      {/* right */}
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleCreateApartment}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder={"Entered Name"}
            value={apartmentCreate.name}
            onChange={handleOnchange}
          />
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-1/2">
              <label>Price per day</label>
              <input
                type="number"
                name="price_per_day"
                placeholder={"Entered Name"}
                value={apartmentCreate.price_per_day}
                onChange={handleOnchange}
              />
            </div>
            {/* num_bedrooms */}
            <div className="flex flex-col w-1/2">
              <label>num_bedrooms</label>
              <input
                type="number"
                name="num_bedrooms"
                placeholder={"Entered num_bedrooms"}
                value={apartmentCreate.num_bedrooms}
                onChange={handleOnchange}
              />
            </div>
          </div>
          {/* num_bathrooms */}
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-1/2">
              <label>num_bathrooms</label>
              <input
                type="number"
                name="num_bathrooms"
                placeholder={"Entered num_bathrooms"}
                value={apartmentCreate.num_bathrooms}
                onChange={handleOnchange}
              />
            </div>
            {/* num_living_rooms */}
            <div className="flex flex-col w-1/2">
              <label>num_living_rooms</label>
              <input
                type="number"
                name="num_living_rooms"
                placeholder={"Entered num_living_rooms"}
                value={apartmentCreate.num_living_rooms}
                onChange={handleOnchange}
              />
            </div>
          </div>
          {/* row 4 */}

          <label>total_people</label>
          <input
            type="number"
            name="total_people"
            placeholder={"Entered total_people"}
            value={apartmentCreate.total_people}
            onChange={handleOnchange}
          />
          {/* row */}
          <div className="flex items-center w-full gap-4">
            <div className="flex flex-col w-1/2">
              <label>Type</label>
              <select
                id="apartment_type"
                name="apartment_type"
                className="outline-none"
                value={apartmentCreate.apartment_type}
                onChange={handleOnchange}
              >
                <option value="" disabled hidden>
                  Chọn loại nhà
                </option>
                {Object.keys(APARTMENT_TYPE).map((key) => (
                  <option key={key} value={key}>
                    {APARTMENT_TYPE[key as keyof typeof APARTMENT_TYPE]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <label>City</label>

              <select
                id="city"
                name="city"
                className="outline-none"
                value={apartmentCreate.city}
                onChange={handleOnchange}
              >
                <option value="" disabled hidden>
                  Chọn thành phố
                </option>
                {Object.keys(CITY).map((key) => (
                  <option key={key} value={key}>
                    {CITY[key as keyof typeof CITY]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* desc */}
          <label>Address</label>
          <textarea
            name="address"
            id="address"
            rows={2}
            placeholder={"Entered address"}
            value={apartmentCreate.address}
            onChange={handleOnchange}
            className="resize-none"
          ></textarea>
          {/* desc */}
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={10}
            placeholder={"Entered description"}
            value={apartmentCreate.desc}
            onChange={handleOnchange}
            className="resize-none"
          ></textarea>
          <BtnSubmit value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default SingleApartmentPage;
