import RangeCalendar from "@/components/common/calendar/rangeCalendar";
import FooterDetail from "@/components/layouts/FooterDetail";
import { Details, InforNeeded, OverView } from "@/components/pages/Detail";

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
      <InforNeeded />
      {/* footer */}
      <FooterDetail />
    </div>
  );
}
