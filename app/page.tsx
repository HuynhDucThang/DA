import { FilterApartment } from "@/components/common";
import { ListApartment } from "@/components/pages/Home";
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
    <div className="px-pd-main pt-8">
      <FilterApartment />
      {/* layout carrd */}

      <Suspense fallback={<div>...loading....</div>}>
        <ListApartment promise={promiseApartment} />
      </Suspense>
    </div>
  );
}
