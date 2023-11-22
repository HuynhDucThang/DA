import Image from "next/image";

interface IProps {
  title?: string;
  handleClick: () => void;
}

export default function ViewMore({
  title = "Hiển thị thêm",
  handleClick,
}: IProps) {
  return (
    <div
      className="flex_center gap-2 w-fit cursor-pointer mt-4"
      onClick={handleClick}
    >
      <h4 className="text-primary text-xl font-semibold underline">{title}</h4>
      <Image
        src="/arrow/arrow_bottom.svg"
        alt="arrow_bottom"
        width={20}
        height={20}
      />
    </div>
  );
}
