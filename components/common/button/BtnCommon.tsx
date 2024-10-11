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
          ? "bg-[var(--color-logo)] hover:opacity-80"
          : "border border-[var(--color-logo)] hover:bg-[var(--color-logo)]"
      } flex_center rounded-lg py-4 mt-4 cursor-pointer transition-all group-btn`}
      onClick={(e)=> {
        e.preventDefault()
        handleClick && handleClick()
      }}
    >
      <div
        className={`text-xl font-semibold transition-all ${
          typeBtn === "fill"
            ? "text-white"
            : "text-[var(--color-logo)] group-hover:text-white"
        } `}
      >
        {title}
      </div>
    </div>
  );
}
