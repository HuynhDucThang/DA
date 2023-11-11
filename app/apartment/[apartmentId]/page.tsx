import FooterDetail from "@/components/layouts/FooterDetail";
import { Details, InforNeeded, OverView } from "@/components/pages/Detail";
import { IApartmentDetail } from "@/utils/interface";

interface IProps {
  searchParams: {
    skip: string;
    limit: string;
  };
  params: {
    apartmentId: string;
  };
}

async function getApartmentById(apartmentId: string) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/apartments/${apartmentId}/apartment`,
    { cache: "no-store" }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function ApartmentDetail({ params }: IProps) {
  const { data }: { data: IApartmentDetail } = await getApartmentById(
    params.apartmentId
  );

  const { amenities, apartment_contract, apartment_tags, ...apartmentDetail } =
    data;

  return (
    <div className="px-pd-detail pt-10">
      {/* heading */}
      <OverView apartmentDetail={apartmentDetail} />
      {/* body */}
      <Details apartment={data} />
      {/* infor */}
      <InforNeeded />
      {/* footer */}
      <FooterDetail />
    </div>
  );
}
