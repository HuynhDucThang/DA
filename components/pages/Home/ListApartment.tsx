import { IApartmentRead } from "@/utils/interface";
import CardApartment from "./CardApartment";

//IApartmentRead[]
interface IProps {
  promise: Promise<Record<string, IApartmentRead[]>>;
}

export default async function ListApartment({ promise }: IProps) {
  const promiseApartment = await promise;
  const apartments = (promiseApartment?.data) ?? [];
  
  return (
    <div id="apartments">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 spacing_between_cpn_detail">
        {apartments.map((apartment, index) => (
          <CardApartment key={index} apartment={apartment} />
        ))}
      </div>
    </div>
  );
}
