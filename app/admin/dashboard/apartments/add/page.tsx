"use client";

import BtnSubmit from "@/components/common/button/btnSubmit";
import PhotoPreview from "@/components/pages/admin/dashboard/apartments/photoPreview";
import styles from "@/components/pages/admin/dashboard/apartments/singleApartment.module.css";
import { IApartmentCreate } from "@/utils/interface";
import { createApartment, updateImagesApartment } from "@/utils/proxy";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    num_toilets: 0,
    rate: 0,
    total_people: 0,
  });

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    if (images.length < 3) {
      alert(" phải nhiều hơn 3 ảnh");
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

      alert("Thành công ");
      router.push("/admin/dashboard/apartments");
    } catch (error) {
      console.log(error);
      alert("Lỗi không thể tạo căn hộ");
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
          <label>Price per day</label>
          <input
            type="number"
            name="price_per_day"
            placeholder={"Entered Name"}
            value={apartmentCreate.price_per_day}
            onChange={handleOnchange}
          />
          {/* num_bedrooms */}
          <label>num_bedrooms</label>
          <input
            type="number"
            name="num_bedrooms"
            placeholder={"Entered num_bedrooms"}
            value={apartmentCreate.num_bedrooms}
            onChange={handleOnchange}
          />
          {/* num_bathrooms */}
          <label>num_bathrooms</label>
          <input
            type="number"
            name="num_bathrooms"
            placeholder={"Entered num_bathrooms"}
            value={apartmentCreate.num_bathrooms}
            onChange={handleOnchange}
          />
          {/* num_living_rooms */}
          <label>num_living_rooms</label>
          <input
            type="number"
            name="num_living_rooms"
            placeholder={"Entered num_living_rooms"}
            value={apartmentCreate.num_living_rooms}
            onChange={handleOnchange}
          />
          <label>total_people</label>
          <input
            type="number"
            name="total_people"
            placeholder={"Entered total_people"}
            value={apartmentCreate.total_people}
            onChange={handleOnchange}
          />
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
