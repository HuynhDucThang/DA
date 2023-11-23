import { FilterApartment } from "@/components/common";
import Toastify from "@/components/common/toastify";
import { ListApartment } from "@/components/pages/Home";
import BannerMain from "@/components/pages/Home/bannerMain";
import { baseURL } from "@/utils/api";
import { Suspense } from "react";

interface IProps {
  searchParams: {
    skip: string;
    limit: string;
    tagId: string;
  };
}

async function getApartments(tagId: string) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/apartments/tag${
      tagId ? `?tag_id=${tagId}` : ""
    }`,
    { cache: "no-store" }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function Home({ searchParams }: IProps) {
  const promiseApartment = getApartments(searchParams.tagId);

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
