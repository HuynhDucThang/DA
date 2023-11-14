interface IProps {
  title: string;
  typeBtn?: "fill" | "outline";
  handleClick?: () => void;
}

export default function BtnCommon({
  title,
  typeBtn = "fill",
  handleClick,
}: IProps) {
  return (
    <div
      className={`${
        typeBtn === "fill"
          ? "bg-[#dc0e64] hover:opacity-80"
          : "border border-[#dc0e64] hover:bg-[#dc0e64]"
      } flex_center rounded-lg py-4 mt-4 cursor-pointer transition-all group`}
      onClick={handleClick}
    >
      <div
        className={`text-xl font-semibold transition-all ${
          typeBtn === "fill"
            ? "text-white"
            : "text-[#dc0e64] group-hover:text-white"
        } `}
      >
        {title}
      </div>
    </div>
  );
}
