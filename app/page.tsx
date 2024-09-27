"use client";

import { useEffect, useState } from "react";
import { FilterApartment, Loading } from "@/components/common";
import BannerMain from "@/components/pages/Home/bannerMain";
import CardApartment from "@/components/pages/Home/CardApartment";
import { getApartmentByTagId } from "@/utils/proxy";
import { IResponseApartment } from "@/utils/interface.v2";

interface IProps {
  searchParams: {
    city: string;
    skip: string;
    limit: string;
    tagId: string;
    lowest_price: number;
    hightest_price: number;
    apartment_type: string;
  };
}

export default function Home({ searchParams }: IProps) {
  const [apartments, setApartments] = useState<IResponseApartment[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const tagId = searchParams.tagId;

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const { data } = await getApartmentByTagId(tagId);
        if (data?.payload) setApartments(data?.payload);
      } catch (error) {
        console.error("fetchApartments error : ", error);
      } finally {
        setIsFetching(false);
      }
    };
    if (tagId) fetchApartments();
  }, [tagId]);

  return (
    <>
      {isFetching ? <Loading /> : null}
      <BannerMain />
      <div className="px-pd-main pt-8">
        <FilterApartment />
        {/* layout carrd */}

        <div id="apartments">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 spacing_between_cpn_detail">
            {apartments.map((apartment, index) => (
              <CardApartment key={index} apartment={apartment} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
