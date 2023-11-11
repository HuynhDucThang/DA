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
          <Image src={`${URL}${apartment.img_room}`} alt="" fill />
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
          <label>num_toilets</label>
          <input
            type="number"
            name="num_toilets"
            placeholder={`${apartment.num_toilets}`}
          />
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
