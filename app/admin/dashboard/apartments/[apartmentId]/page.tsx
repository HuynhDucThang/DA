"use client";

import styles from "@/components/pages/admin/dashboard/apartments/singleApartment.module.css";
import { showToast } from "@/utils/helpers/common";
import { IResponseApartment } from "@/utils/interface.v2";
import { getApartmentDetail, updateApartment } from "@/utils/proxy";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const SingleApartmentPage = ({ params }: any) => {
  const { apartmentId } = params;
  const [formValues, setFormValues] = useState<IResponseApartment | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const { data } = await getApartmentDetail(apartmentId);
        setFormValues({ ...data.payload });
      } catch (error) {
        showToast("Error when fetching apartment", "error");
      }
    };
    fetchApartment();
  }, [apartmentId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (formValues) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formValues);
    if (!formValues) return;

    const { _id, ...body } = formValues;

    function isObject(value: any) {
      return (
        value !== null && typeof value === "object" && !Array.isArray(value)
      );
    }

    const convertInput = (
      obj: object | Array<any>,
      parentKey: string | null,
      result: Record<string, any>
    ) => {
      if (Array.isArray(obj)) {
        obj.forEach((value, index) => {
          const formKey = parentKey ? `${parentKey}[${index}]` : `[${index}]`;

          if (!isObject(value)) {
            result[formKey] = value;
          } else {
            convertInput(value, formKey, result);
          }
        });
      } else if (isObject(obj)) {
        Object.keys(obj).forEach((key) => {
          const formKey = parentKey ? `${parentKey}.${key}` : key;
          const value = obj[key as keyof typeof obj];

          if (isObject(value) || Array.isArray(value)) {
            convertInput(value, formKey, result);
          } else {
            result[formKey] = value;
          }
        });
      }

      return result;
    };
    const { name, description, pricePerNight, rooms, address, isApproved } =
      formValues;

    try {
      await updateApartment(
        apartmentId,
        convertInput(
          { name, description, rooms, address, isApproved, pricePerNight },
          null,
          {}
        )
      );
      showToast("Updated successfully", "success");
      router.push("/admin/dashboard/apartments")
    } catch (error) {
      showToast("Error when updating", "error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            placeholder={formValues?.name}
          />

          {/* row 1 */}
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-1/2">
              <label>Price per day</label>
              <input
                type="number"
                name="pricePerNight"
                onChange={handleInputChange}
                placeholder={`${formValues?.pricePerNight}`}
              />
            </div>
            {/* num_bedrooms */}
            <div className="flex flex-col w-1/2">
              <label>num_bedrooms</label>
              <input
                type="number"
                name="num_bedrooms"
                onChange={(e) =>
                  setFormValues((preV: any) => {
                    return {
                      ...preV,
                      rooms: { ...preV.rooms, bedRoom: e.target.value },
                    };
                  })
                }
                placeholder={`${formValues?.rooms.bedRoom}`}
              />
            </div>
          </div>

          {/* row 2 */}
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-1/2">
              {/* num_bathrooms */}
              <label>num_bathrooms</label>
              <input
                type="number"
                name="num_bathrooms"
                onChange={(e) =>
                  setFormValues((preV: any) => {
                    return {
                      ...preV,
                      rooms: { ...preV.rooms, bathRoom: e.target.value },
                    };
                  })
                }
                placeholder={`${formValues?.rooms.bathRoom}`}
              />
            </div>
            {/* num_living_rooms */}
            <div className="flex flex-col w-1/2">
              <label>num_living_rooms</label>
              <input
                type="number"
                name="num_living_rooms"
                onChange={(e) =>
                  setFormValues((preV: any) => {
                    return {
                      ...preV,
                      rooms: { ...preV.rooms, livingRoom: e.target.value },
                    };
                  })
                }
                placeholder={`${formValues?.rooms.livingRoom}`}
              />
            </div>
          </div>

          {/* row 3 */}
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-1/2">
              <label>total_people</label>
              <input
                type="number"
                name="total_people"
                onChange={handleInputChange}
                placeholder={`${formValues?.numOfMinRentNight}`}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label>Is approved</label>
              <select
                name="isApproved"
                id="isApproved"
                onChange={handleInputChange}
                placeholder={`${formValues?.isApproved}`}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>

          {/* address */}
          <label>Address</label>
          <textarea
            name="address"
            id="address"
            rows={2}
            placeholder={formValues?.address}
            onChange={(e) =>
              setFormValues((preV: any) => {
                return { ...preV, address: e.target.value };
              })
            }
            className="resize-none"
          ></textarea>
          {/* desc */}
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={10}
            placeholder={formValues?.description}
            onChange={(e) =>
              setFormValues((preV: any) => {
                return { ...preV, description: e.target.value };
              })
            }
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleApartmentPage;
