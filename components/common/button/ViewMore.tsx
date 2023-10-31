import Image from "next/image";

export default function ViewMore() {
  return (
    <div className="flex_center gap-2 w-fit cursor-pointer mt-4">
      <h4 className="text-primary text-xl font-semibold underline">
        Hiển thị thêm
      </h4>
      <Image
        src="/arrow/arrow_bottom.svg"
        alt="arrow_bottom"
        width={20}
        height={20}
      />
    </div>
  );
}
