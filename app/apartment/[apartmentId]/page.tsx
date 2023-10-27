import { Details, OverView } from "@/components/pages/Detail";

interface IProps {
  searchParams: {
    skip: string;
    limit: string;
  };
}

export default function ApartmentDetail({}: IProps) {
  return (
    <div className="px-pd-detail pt-10">
      <OverView />
      <Details />
    </div>
  );
}
