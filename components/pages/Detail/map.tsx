import Image from "next/image";

export default function Map() {
  return (
    <div className="my-6 w-full">
      <div className="relative aspect-[1/0.2]">
        <Image src="/map.png" alt="map" fill className="object-cover" />
      </div>
    </div>
  );
}
