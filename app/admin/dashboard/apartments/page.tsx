import Image from "next/image";
import Link from "next/link";
import styles from "@/components/pages/admin/dashboard/apartments/apartments.module.css";

import Pagination from "@/components/pages/admin/dashboard/pagination";
import Search from "@/components/pages/admin/dashboard/search/search";

import { getApartments } from "@/utils/proxyServer";
import { deleteApartment } from "@/utils/actions";
import { IApartmentRead } from "@/utils/interface";
import { handleConvertDate } from "@/utils/helpers/common";
import { URL } from "@/utils/api";

const ApartmentsPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { data } = await getApartments(q, page);
  const apartments: IApartmentRead[] = data.data;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/admin/dashboard/apartments/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table} style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Total rooms</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment) => (
            <tr key={apartment.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={
                      `${URL}/${apartment?.images?.[0]?.image_url}` || "/avatar.png"
                    }
                    alt="banner"
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {apartment.name}
                </div>
              </td>
              <td>{apartment.desc}</td>
              <td>${apartment.price_per_day}</td>
              <td>{handleConvertDate(new Date(apartment.created_at))}</td>
              <td>
                {apartment.num_bathrooms +
                  apartment.num_bedrooms +
                  apartment.num_living_rooms}{" "}
                rooms
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/dashboard/apartments/${apartment.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteApartment}>
                    <input
                      type="hidden"
                      name="apartmentId"
                      value={apartment.id}
                    />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={10} />
    </div>
  );
};

export default ApartmentsPage;
