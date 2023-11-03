import Image from "next/image";
import React from "react";

export default function AddHome() {
  return (
    <div>
      <div className="container mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:gap-2 gap-4">
          <div>
            <h1 className="text-brand font-bold text-7xl">Airbnb it</h1>
            <h1 className="text-black font-semibold text-3xl mb-3">
              You could earn
            </h1>
            <div className="flex space-x-4 items-center">
              {/* <Counter num={generateRandomNumber()} /> */}
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
          </div>
          <div className="">
            <form className="mb-5">
              <div className="grid grid-cols-1  lg:grid-cols-2  gap-4">
                <div className="mt-5">
                  <label htmlFor="title">Title</label>
                  <input
                    placeholder="Enter title"
                    id="title"
                    // onChange={(e) => setValue("title", e.target.value)}
                  />
                  <span className="text-red-500 font-bold">
                    {/* {errors?.title?.message} */}
                  </span>
                </div>
                <div className="mt-5">
                  <label htmlFor="countries">Countries</label>
                  <select
                    className="outline-brand h-10 px-3 py-2 rounded-md w-full border"
                    id="countries"
                  >
                    <option value=""> -- Select Counrties --</option>
                    {Array.from({ length: 5 }).map((item, index) => (
                      <option key={index} value={`coutry - ${index}`}>
                        `coutry - ${index}`
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 font-bold">
                    {/* {errors?.country?.message} */}
                  </span>
                </div>
                <div className="mt-5">
                  <label htmlFor="state">State</label>
                  <input placeholder="Enter state" id="state" />
                  <span className="text-red-500 font-bold">
                    {/* {errors?.state?.message} */}
                  </span>
                </div>
                <div className="mt-5">
                  <label htmlFor="city">City</label>
                  <input placeholder="Enter city" id="city" />
                  <span className="text-red-500 font-bold">
                    {/* {errors?.city?.message} */}
                  </span>
                </div>
                <div className="mt-5">
                  <label htmlFor="price">Price</label>
                  <input placeholder="Enter price" type="number" id="price" />
                  <span className="text-red-500 font-bold"></span>
                </div>
                <div className="mt-5">
                  <div>Image</div>
                  <input type="file" placeholder="Enter image" id="image" />
                  <span className="text-red-500 font-bold"></span>
                </div>
              </div>
              <div className="mt-5">
                <div>Description</div>
                {/* <Textarea
          placeholder="Write your description here.."
          id="description"
          {...register("description")}
        ></Textarea> */}
                {/* <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
        /> */}
                <div>react - quill</div>
                <span className="text-red-500 font-bold">
                  {"errors?.description?.message"}
                </span>
              </div>
              <div className="mt-5">
                <div>Categories</div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div className="items-top flex space-x-2" key={index}>
                      <input type="checkbox" value={index} />
                      <label className="text-sm font-medium ">{index}</label>
                    </div>
                  ))}
                </div>
                <span className="text-red-500 font-bold mt-2">
                  {/* {errors?.categories?.message} */}
                </span>
              </div>
              <div className="mt-5">
                <button className="bg-brand w-full" disabled={false}>
                  button
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
