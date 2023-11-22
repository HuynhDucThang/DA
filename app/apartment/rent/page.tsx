"use client"

import CardApartment from "@/components/pages/Home/CardApartment";


export default function RentedApartment() {
  return (
    <div className="container_px">
      <div className="mb-4">
        <h2 className="text-3xl text-primary font-bold">Danh sách căn hộ đã thuê (12)</h2>
      </div>
      <div className="grid gap-3 grid-cols-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>carrd</div>
        ))}
      </div>
    </div>
  );
}
