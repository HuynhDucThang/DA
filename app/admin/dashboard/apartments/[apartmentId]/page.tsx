import styles from "@/components/pages/admin/dashboard/apartments/singleApartment.module.css";
import { updateApartmentAction } from "@/utils/actions";
import { IApartmentDetail } from "@/utils/interface";
import { getApartmentDetailServer } from "@/utils/proxyServer";

const SingleApartmentPage = async ({ params }: any) => {
  const { apartmentId } = params;
  const { data } = await getApartmentDetailServer(apartmentId);

  const apartment: IApartmentDetail = data.data;

  return (
    <div className={styles.container}>
      {/* <div className={styles.infoContainer}>
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
      </div> */}
      <div className={styles.formContainer}>
        <form action={updateApartmentAction} className={styles.form}>
          <input type="hidden" name="id" value={apartment.id} />
          <label>Name</label>
          <input type="text" name="name" placeholder={apartment.name} />

          {/* row 1 */}
          <div className="flex w-full gap-4">
            <div className="flex flex-col w-1/2">
              <label>Price per day</label>
              <input
                type="number"
                name="price_per_day"
                placeholder={`${apartment.price_per_day}`}
              />
            </div>
            {/* num_bedrooms */}
            <div className="flex flex-col w-1/2">
              <label>num_bedrooms</label>
              <input
                type="number"
                name="num_bedrooms"
                placeholder={`${apartment.num_bedrooms}`}
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
                placeholder={`${apartment.num_bathrooms}`}
              />
            </div>
            {/* num_living_rooms */}
            <div className="flex flex-col w-1/2">
              <label>num_living_rooms</label>
              <input
                type="number"
                name="num_living_rooms"
                placeholder={`${apartment.num_living_rooms}`}
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
                placeholder={`${apartment.total_people}`}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label>Is approved</label>
              <select
                name="is_approved"
                id="is_approved"
                placeholder={`${apartment.is_approved}`}
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
