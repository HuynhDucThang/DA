import Image from "next/image";

interface IProps {
  url: string;
  full?: boolean;
  onDelete?: () => void;
}

export default function PhotoPreview({ url, full = false, onDelete }: IProps) {
  return (
    <div
      className={`relative cursor-pointer ${
        full ? "w-full h-full" : "w-14 h-14"
      }`}
      onClick={onDelete}
    >
      <Image src={url} alt="banner preview" fill className="object-cover" />
      <div onClick={onDelete}>delete</div>
    </div>
  );
}
