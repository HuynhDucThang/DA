import FooterDetail from "@/components/layouts/FooterDetail";
import { Details, InforNeeded, Map, OverView } from "@/components/pages/Detail";
import Comment from "@/components/pages/Detail/Comment";
import { IApartmentDetail } from "@/utils/interface";
import { getApartmentComments } from "@/utils/proxyServer";

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
  const getApartment = getApartmentById(params.apartmentId);
  const getComment = getApartmentComments(params.apartmentId);

  const [apartmentData, commentData] = await Promise.all([
    getApartment,
    getComment,
  ]);

  const {
    total_rating,
    amenities,
    apartment_contract,
    apartment_tags,
    ...apartmentDetail
  } = apartmentData.data as IApartmentDetail;

  return (
    <div className="px-pd-detail pt-10">
      {/* heading */}
      <OverView
        apartmentDetail={apartmentDetail}
        totalComment={commentData.data.data.comments.length}
        total_rating={total_rating}
      />
      {/* body */}
      <Details apartment={apartmentData.data} />

      <Comment
        apartmentId={params.apartmentId}
        commentApartment={commentData.data.data}
      />
      {/* Map */}
      <Map />
      {/* infor */}
      <InforNeeded />

      {/* footer */}
      <FooterDetail />
    </div>
  );
}
