import Image from "next/image";
import Link from "next/link";
import styles from "@/components/pages/admin/dashboard/apartments/apartments.module.css";

import Pagination from "@/components/pages/admin/dashboard/pagination";
import Search from "@/components/pages/admin/dashboard/search/search";

import { getApartmentsServer } from "@/utils/proxyServer";
import { deleteApartment, updateApartmentAction } from "@/utils/actions";
import { IApartmentRead } from "@/utils/interface";
import { handleConvertDate } from "@/utils/helpers/common";
import { URL } from "@/utils/api";

export const dynamic = "force-dynamic";

const ApartmentsPage = async ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const data = await getApartmentsServer(q, page);
  const apartments: IApartmentRead[] = data.data;
  const totalRecord = data.total_record;

  return (
    <div className={`${styles.container} overflow-y-auto`}>
      <div className={styles.top}>
        <Search placeholder="Search by name apartments ..." />
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
            <td>Create At</td>
            <td>Type</td>
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
                      `${URL}/${apartment?.images?.[0]?.image_url}` ||
                      "/avatar.png"
                    }
                    alt="banner"
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {apartment.name}
                </div>
              </td>
              <td className="flex items-center line-clamp-3 overflow-y-auto max-h-20 max-w-[200px]">
                {apartment.desc}
              </td>
              <td>${apartment.price_per_day}</td>
              <td>{handleConvertDate(new Date(apartment.created_at))}</td>
              <td>{apartment.apartment_type}</td>
              <td>
                {apartment.num_bathrooms +
                  apartment.num_bedrooms +
                  apartment.num_living_rooms}{" "}
                rooms
              </td>
              <td>
                <div className={styles.buttons}>
                  {apartment.is_approved ? (
                    <Link
                      href={`/admin/dashboard/apartments/${apartment.id}`}
                      prefetch={false}
                    >
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                  ) : (
                    <form action={updateApartmentAction}>
                      <input
                        type="hidden"
                        name="id"
                        value={apartment.id}
                      />
                      <input
                        type="hidden"
                        name="is_approved"
                        value={`${true}`}
                      />
                      <button className={`${styles.button} ${styles.view}`}>
                        Approved
                      </button>
                    </form>
                  )}
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
      <Pagination count={totalRecord ?? 0} />
    </div>
  );
};

export default ApartmentsPage;
