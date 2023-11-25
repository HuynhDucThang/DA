import PhotoPreview from "@/components/pages/admin/dashboard/apartments/photoPreview";
import styles from "@/components/pages/admin/dashboard/apartments/singleApartment.module.css";
import { updateApartmentAction } from "@/utils/actions";
import { URL } from "@/utils/api";
import { IApartmentDetail } from "@/utils/interface";
import { getApartmentDetailServer } from "@/utils/proxyServer";
import Image from "next/image";

const SingleApartmentPage = async ({ params }: any) => {
  const { apartmentId } = params;
  const { data } = await getApartmentDetailServer(apartmentId);

  const apartment: IApartmentDetail = data.data;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={`${URL}/${apartment?.images?.[0]?.image_url}`}
            alt=""
            fill
          />
        </div>
        <div className="flex">
          {apartment.images.length &&
            apartment.images
              .slice(1, 6)
              .map((img, index) => (
                <PhotoPreview key={index} url={`${URL}/${img?.image_url}`} />
              ))}
        </div>
      </div>
      <div className={styles.formContainer}>
        <form action={updateApartmentAction} className={styles.form}>
          <input type="hidden" name="id" value={apartment.id} />
          <label>Name</label>
          <input type="text" name="name" placeholder={apartment.name} />
          <label>Price per day</label>
          <input
            type="number"
            name="price_per_day"
            placeholder={`${apartment.price_per_day}`}
          />
          {/* num_bedrooms */}
          <label>num_bedrooms</label>
          <input
            type="number"
            name="num_bedrooms"
            placeholder={`${apartment.num_bedrooms}`}
          />
          {/* num_bathrooms */}
          <label>num_bathrooms</label>
          <input
            type="number"
            name="num_bathrooms"
            placeholder={`${apartment.num_bathrooms}`}
          />
          {/* num_living_rooms */}
          <label>num_living_rooms</label>
          <input
            type="number"
            name="num_living_rooms"
            placeholder={`${apartment.num_living_rooms}`}
          />
          <label>total_people</label>
          <input
            type="number"
            name="total_people"
            placeholder={`${apartment.total_people}`}
          />
          {/* desc */}
          <label>Address</label>
          <textarea
            name="address"
            id="address"
            rows={2}
            placeholder={apartment.address}
            className="resize-none"
          ></textarea>
          {/* desc */}
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={10}
            placeholder={apartment.desc}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleApartmentPage;
