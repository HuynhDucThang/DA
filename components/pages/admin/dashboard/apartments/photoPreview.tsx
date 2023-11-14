import Image from "next/image";

interface IProps {
  url: string;
  onDelete?: () => void;
}

export default function PhotoPreview({ url, onDelete }: IProps) {
  return (
    <div className="relative w-12 h-12 cursor-pointer" onClick={onDelete}>
      <Image src={url} alt="banner preview" fill />
      <div onClick={onDelete}>delete</div>
    </div>
  );
}
