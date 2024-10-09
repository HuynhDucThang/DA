"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "@/components/pages/admin/dashboard/apartments/apartments.module.css";
import Pagination from "@/components/pages/admin/dashboard/pagination";
import Search from "@/components/pages/admin/dashboard/search/search";

import { handleConvertDate, showToast } from "@/utils/helpers/common";
import { IResponseApartment } from "@/utils/interface.v2";
import { deleteApartment, getApartments, updateApartment } from "@/utils/proxy";


const ApartmentsPage = ({ searchParams }: any) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const [apartments, setApartments] = useState<IResponseApartment[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [isFeching, setIsFetching] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchApartments = async () => {
    setIsFetching(true);

    try {
      const { data } = await getApartments(searchParams);
      setApartments(data.payload);
      setTotalRecord(data.payload.length);
    } catch (error) {
      showToast("Fetch apartments fail", "error");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [q, page]);

  const handleDeleteApartment = async (apartmentId: string) => {
    setIsDeleting(true);
    try {
      await deleteApartment(apartmentId);
      await fetchApartments();
      showToast("Delete success");
    } catch (error) {
      showToast("Delete fail", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleApprovedApartment = async (apartmentId: string) => {
    setIsDeleting(true);
    try {
      await updateApartment(apartmentId, { isApproved: true });
      await fetchApartments();
      showToast("Update approved success");
    } catch (error) {
      showToast("Update approved fail", "error");
    } finally {
      setIsDeleting(false);
    }
  };

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
            <td>Approved</td>
            <td>Price</td>
            <td>Create At</td>
            <td>Type</td>
            <td>Total rooms</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment) => (
            <tr key={apartment._id}>
              <td>
                <div className={styles.product}>
                  <div className="relative w-[40px] h-[40px]">
                    <Image
                      src={apartment.images?.[0] || "/avatar.png"}
                      alt="banner"
                      fill
                      className={styles.productImage}
                    />
                  </div>

                  {apartment.name}
                </div>
              </td>
              <td>{apartment.isApproved ? "TRUE" : "FALSE"}</td>
              <td>{apartment.pricePerNight} Vnđ</td>
              <td>
                {apartment.updatedAt &&
                  handleConvertDate(new Date(apartment.updatedAt))}
              </td>
              <td>{apartment.type}</td>
              <td>
                {`${apartment.rooms.bathRoom} phòng tắm, ${apartment.rooms.livingRoom} phòng khách, ${apartment.rooms.bedRoom} phòng ngủ`}
              </td>
              <td>
                <div className={styles.buttons}>
                  {apartment.isApproved ? (
                    <Link
                      href={`/admin/dashboard/apartments/${apartment._id}`}
                      prefetch={false}
                    >
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                  ) : (
                    <button
                      className={`${styles.button} ${styles.view}`}
                      onClick={() => handleApprovedApartment(apartment._id)}
                    >
                      Approved
                    </button>
                  )}
                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDeleteApartment(apartment._id)}
                  >
                    Delete
                  </button>
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
