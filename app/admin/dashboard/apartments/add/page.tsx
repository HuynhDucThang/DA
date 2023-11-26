"use client";

import BtnSubmit from "@/components/common/button/btnSubmit";
import SelectC, { IOption } from "@/components/common/select";
import PhotoPreview from "@/components/pages/admin/dashboard/apartments/photoPreview";
import styles from "@/components/pages/admin/dashboard/apartments/singleApartment.module.css";
import { APARTMENT_TYPE, CITY } from "@/utils/enum";
import { showToast } from "@/utils/helpers/common";
import { IApartmentCreate } from "@/utils/interface";
import {
  createApartment,
  getAmenities,
  getTagsFilter,
  updateImagesApartment,
} from "@/utils/proxy";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [images, setImages] = useState<any[]>([]);

  const [selectedAmenities, setSelectedAmenities] = useState<IOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<IOption[]>([]);
  const [tags, setTags] = useState<IOption[]>([]);
  const [amenities, setAmenities] = useState<IOption[]>([]);

  const convertOptions = (data: any[]) => {
    const dataOptions: IOption[] = [];
    data.forEach((option) => {
      dataOptions.push({
        key: option.id,
        value: option.name,
      });
    });
    return dataOptions;
  };

  useEffect(() => {
    const getValuesCreate = async () => {
      try {
        const promiseTags = getTagsFilter();
        const promiseAmenities = getAmenities();

        const [dataTags, dataAmenities] = await Promise.all([
          promiseTags,
          promiseAmenities,
        ]);

        setTags(convertOptions(dataTags.data.data));
        setAmenities(convertOptions(dataAmenities.data.data));
      } catch (error) {
        showToast("Lỗi trong quá trình xử lý");
      }
    };

    getValuesCreate();
  }, []);

  const router = useRouter();

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

  const handleCovertToArrIds = (data: any[]) => {
    const ids: string[] = [];
    data.forEach((item) => ids.push(item.key));
    return ids;
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

    const tag_ids = handleCovertToArrIds(selectedTags);
    const amenities_ids = handleCovertToArrIds(selectedAmenities);

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
        <label htmlFor="images" className={`${styles.imgContainer} block cursor-pointer`}>
          <Image src={`/img-upload.png`} alt="" fill />
        </label>
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
          id="images"
          type="file"
          accept=".png, .jpg"
          multiple
          hidden
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
          {/* select */}
          <div className="flex items-center w-full gap-4">
            <div className="flex flex-col w-1/2">
              <label>apartment amenities</label>
              <SelectC
                title="amenities"
                selected={selectedAmenities}
                handleOnSelected={(options) => setSelectedAmenities(options)}
                options={amenities}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label>apartment tags</label>
              <SelectC
                title="tags"
                selected={selectedTags}
                handleOnSelected={(options) => setSelectedTags(options)}
                options={tags}
              />
            </div>
          </div>

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
