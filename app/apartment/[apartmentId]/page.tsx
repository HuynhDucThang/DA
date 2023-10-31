import FooterDetail from "@/components/layouts/FooterDetail";
import { Details, InforNeeded, OverView } from "@/components/pages/Detail";
import dynamic from "next/dynamic";
const CalendarCustom = dynamic(() => import('@/components/common/calendar'), { ssr: false })

interface IProps {
  searchParams: {
    skip: string;
    limit: string;
  };
}

export default function ApartmentDetail({}: IProps) {
  return (
    <div className="px-pd-detail pt-10">
      {/* heading */}
      <OverView />
      {/* body */}
      <Details />
      {/* infor */}
      <CalendarCustom />
      <InforNeeded />
      {/* footer */}
      <FooterDetail />
    </div>
  );
}
