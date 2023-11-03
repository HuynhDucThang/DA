interface IProps {
  title: string;
  handleClick?: () => void;
}

export default function BtnCommon({ title, handleClick }: IProps) {
  return (
    <div
      className="bg-[#dc0e64] flex_center rounded-lg py-4 mt-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="text-xl font-semibold text-white ">{title}</div>
    </div>
  );
}
