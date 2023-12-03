"use client";

import SelectC, { IOption } from "@/components/common/select";
import { APARTMENT_TYPE, CITY } from "@/utils/enum";
import { showToast } from "@/utils/helpers/common";
import { IApartmentCreate } from "@/utils/interface";
import {
  createApartment,
  getAmenities,
  getTagsFilter,
  updateImagesApartment,
} from "@/utils/proxy";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { ListFiles } from "@/components/pages/user/ListFiles";

export default function AddApartment() {
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
  const [step, setStep] = useState<number>(0);

  const [selectedAmenities, setSelectedAmenities] = useState<IOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<IOption[]>([]);
  const [tags, setTags] = useState<IOption[]>([]);
  const [amenities, setAmenities] = useState<IOption[]>([]);
  const router = useRouter();

  const { currentUser } = useAppSelector((state) => state.user);

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

  const isAllPropertiesValid = (apartment: any): boolean => {
    for (const key in apartment) {
      if (apartment.hasOwnProperty(key)) {
        if (apartment[key] === "" || apartment[key] === 0) {
          return false;
        }
      }
    }
    return true;
  };

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

  const handleCreateApartment = async () => {
    if (!currentUser.id) {
      showToast("Haỹ đăng nhập để sử dụng chức năng này", "error");

      return;
    }
    if (images.length < 5) {
      showToast("Phải có nhiều hơn 5 ảnh", "error");
      return;
    }

    const formData = new FormData();

    images.forEach((img) => {
      formData.append("images", img);
    });

    const tag_ids = handleCovertToArrIds(selectedTags);
    const amenities_ids = handleCovertToArrIds(selectedAmenities);

    try {
      const { data } = await createApartment(
        { ...apartmentCreate },
        {
          tag_ids,
          amenities: amenities_ids,
        }
      );
      await updateImagesApartment(data?.id, formData);

      showToast("Thành công");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      showToast(`${error?.response?.data?.detail}`, "error");
    }
  };

  const handleNextStep = () => {
    if (!isAllPropertiesValid(apartmentCreate)) {
      showToast("Hãy nhập đầy đủ thông tin", "error");
      return;
    }
    setStep((pre) => pre + 1);
  };

  return (
    <div className="">
      <div className="container mt-10 mx-auto">
        <div className="grid grid-cols-1 max-w-[800px] w-full h-[82vh] overflow-y-auto mx-auto shadow-2xl rounded-2xl place-items-center gap-4">
          {/* <div>
            <h1 className="text-brand font-bold text-7xl">Airbnb it</h1>
            <h1 className="text-black font-semibold text-3xl mb-3">
              You could earn
            </h1>
            <div className="flex space-x-4 items-center">
              <h3 className="text-3xl">16,986</h3>
              <strong className="text-3xl">per night</strong>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-2 mt-5">
              <Image
                src="/images/home_img.jpeg"
                width={200}
                height={200}
                alt="home"
                className="rounded-2xl object-cover"
              />
              <Image
                src="/images/home_img1.jpeg"
                width={205}
                height={205}
                alt="home"
                className="rounded-2xl object-cover"
              />
            </div>
          </div> */}
          <h2 className="text-3xl text-txt-primary font-semibold sticky top-0 z-10 bg-white p-6 w-full text-center shadow-lg">
            {["Nhập thông tin căn hộ", "Tải ảnh cho căn hộ"][step]}
          </h2>

          {step === 0 ? (
            <form className="flex flex-col gap-2">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder={"Entered Name"}
                value={apartmentCreate.name}
                onChange={handleOnchange}
                className="w-full border p-4 rounded-lg"
              />
              <div className="flex w-full gap-4 ">
                <div className="flex flex-col w-1/2">
                  <label>Price per day</label>
                  <input
                    type="number"
                    name="price_per_day"
                    placeholder={"Entered Name"}
                    value={apartmentCreate.price_per_day}
                    onChange={handleOnchange}
                    className="border p-4 rounded-lg"
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
                    className="border p-4 rounded-lg"
                  />
                </div>
              </div>
              {/* num_bathrooms */}
              <div className="flex w-full gap-4 ">
                <div className="flex flex-col w-1/2">
                  <label>num_bathrooms</label>
                  <input
                    type="number"
                    name="num_bathrooms"
                    placeholder={"Entered num_bathrooms"}
                    value={apartmentCreate.num_bathrooms}
                    onChange={handleOnchange}
                    className="border p-4 rounded-lg"
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
                    className="border p-4 rounded-lg"
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
                className="border p-4 rounded-lg"
              />
              {/* select */}
              <div className="flex items-center w-full gap-4 ">
                <div className="flex flex-col w-1/2">
                  <label>apartment amenities</label>
                  <SelectC
                    title="amenities"
                    selected={selectedAmenities}
                    handleOnSelected={(options) =>
                      setSelectedAmenities(options)
                    }
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
              <div className="flex items-center w-full gap-4 ">
                <div className="flex flex-col w-1/2">
                  <label>Type</label>
                  <select
                    id="apartment_type"
                    name="apartment_type"
                    className="outline-none border p-4 rounded-lg"
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

                <div className="flex flex-col w-1/2 ">
                  <label>City</label>

                  <select
                    id="city"
                    name="city"
                    className="outline-none border p-4 rounded-lg"
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
                className="resize-none border p-4 rounded-lg"
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
                className="resize-none border p-4 rounded-lg"
              ></textarea>
            </form>
          ) : (
            <div className="w-full h-[300px] p-4">
              {!images.length ? (
                <label
                  htmlFor="images"
                  className={`relative cursor-pointer h-full border-[5px] border-dashed rounded-xl flex-col flex items-center justify-center`}
                >
                  <Image
                    src={`/img-upload.png`}
                    alt=""
                    width={150}
                    height={80}
                  />
                  <p className="text-xl text-txt-primary font-semibold">
                    Click vào đây để tải ảnh lên
                  </p>
                </label>
              ) : (
                <div className="flex">
                  <ListFiles files={images} handleDeleteImgsTmp={handleDelete}>
                    <label
                      htmlFor="images"
                      className={`relative cursor-pointer h-full border-[5px] border-dashed rounded-xl flex-col flex items-center justify-center`}
                    >
                      <Image
                        src={`/img-upload.png`}
                        alt=""
                        width={100}
                        height={50}
                      />
                      <p className="text-xl text-txt-primary font-semibold">
                        Upload{" "}
                      </p>
                    </label>
                  </ListFiles>
                </div>
              )}

              <input
                id="images"
                type="file"
                accept=".png, .jpg"
                multiple
                hidden
                onChange={handleUploadFiles}
              />
            </div>
          )}

          <div className="p-4 sticky bottom-0 shadow-2xl border-t border-c-grey w-full px-[-20px] mt-4 bg-white flex justify-center">
            <div
              className="text-white w-1/2 py-4 px-6 bg-[#222222] hover:bg-black hover:shadow-lg transition-all duration-500 rounded-xl text-center text-xl font-medium cursor-pointer"
              onClick={() => {
                if (step === 0) {
                  handleNextStep();
                } else {
                  handleCreateApartment();
                }
              }}
            >
              {["Bước tiếp theo", "Tạo căn hộ"][step]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}