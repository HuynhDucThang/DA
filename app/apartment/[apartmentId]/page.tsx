"use client";

import { useEffect, useState } from "react";
import { apartmentData } from "@/utils/data";
import Comment from "@/components/pages/Detail/Comment";
import FooterDetail from "@/components/layouts/FooterDetail";
import { getApartmentDetail, getCommentByApartment } from "@/utils/proxy";
import { Details, InforNeeded, Map, OverView } from "@/components/pages/Detail";
import {
  IResponseApartment,
  IResponseApartmentComment,
} from "@/utils/interface.v2";
import { Loading } from "@/components/common";
import { showToast } from "@/utils/helpers/common";

interface IProps {
  searchParams: {
    skip: string;
    limit: string;
    payment: string;
  };
  params: {
    apartmentId: string;
  };
}

export default function ApartmentDetail({ params, searchParams }: IProps) {
  const [comments, setComments] = useState<IResponseApartmentComment[]>([]);
  const [apartment, setApartment] = useState<IResponseApartment | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const apartmentId = params.apartmentId;

  useEffect(() => {
    if (searchParams.payment === "true") showToast("Thanh toán thành công");
  }, [searchParams.payment]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apartmentPromise = getApartmentDetail(apartmentId);
        const commentPromise = getCommentByApartment(apartmentId);

        const [apartmentData, commentData] = await Promise.allSettled([
          apartmentPromise,
          commentPromise,
        ]);
        if (apartmentData.status === "fulfilled") {
          setApartment(apartmentData.value.data.payload);
        }

        if (commentData.status === "fulfilled") {
          setComments(commentData.value.data.payload);
        }
      } catch (error) {
        console.log("error ApartmentDetail : ", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isFetching ? <Loading /> : null}
      <div className="px-pd-detail pt-10">
        {/* heading */}
        <OverView
          apartmentDetail={apartment}
          totalComment={comments?.length ?? 0}
          total_rating={apartment?.rating?.totalScope ?? 0}
        />
        {/* body */}
        {apartment ? (
          <Details apartment={apartment} totalComments={comments.length} />
        ) : null}

        <Comment
          ratings={apartment?.rating}
          apartmentId={params.apartmentId}
          commentApartment={comments}
        />

        {/* Map */}
        <Map />
        {/* infor */}
        <InforNeeded />

        {/* footer */}
        <FooterDetail />
      </div>
    </>
  );
}
