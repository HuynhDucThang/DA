import CardApartment from "./CardApartment";

interface IProps {
  promise: Promise<Response>;
}

export default async function ListApartment() {
  // const data = (await promise) as any;

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 spacing_between_cpn_detail">
        {Array.from({ length: 8 }).map((_, index) => (
          <CardApartment key={index} />
        ))}
      </div>
    </div>
  );
}
