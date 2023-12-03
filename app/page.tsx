import { FilterApartment } from "@/components/common";
import Toastify from "@/components/common/toastify";
import { ListApartment } from "@/components/pages/Home";
import BannerMain from "@/components/pages/Home/bannerMain";
import { baseURL } from "@/utils/api";
import { Suspense } from "react";

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

async function getApartments(searchParams: any) {
  const params = new URLSearchParams();
  const addParamIfExist = (key: string, value: any) => {
    if (value) {
      params.set(key, value);
    }
  };

  Object.keys(searchParams).forEach((key) => {
    if (searchParams[key]) {
      const keyName = key === "tagId" ? "tag_id" : key;
      addParamIfExist(keyName, searchParams[key]);
    }
  });

  const res = await fetch(
    `http://127.0.0.1:8000/api/apartments/tag?${params.toString()}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function Home({ searchParams }: IProps) {
  const promiseApartment = getApartments({
    ...searchParams,
    is_approved: true,
  });

  return (
    <>
      <BannerMain />
      <div className="px-pd-main pt-8">
        <FilterApartment />
        {/* layout carrd */}

        <Suspense fallback={<div>...loading....</div>}>
          <ListApartment promise={promiseApartment} />
        </Suspense>
      </div>
    </>
  );
}
