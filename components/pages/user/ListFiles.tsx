import { Img } from "./img";

interface IPropsFiles {
  files: File[];
  children?: React.ReactNode;
  handleDeleteImgsTmp: (index: number) => void;
}

export function ListFiles({
  children,
  files,
  handleDeleteImgsTmp,
}: IPropsFiles) {
  return (
    <div className="grid grid-cols-2 gap-4 max-h-[350px] w-full overflow-y-auto overflow-x-hidden my-4">
      <div className="aspect-[1/1]">{children}</div>
      {files.map((file, index) => {
        return (
          <Img
            blob_url={URL.createObjectURL(file)}
            handleClick={() => handleDeleteImgsTmp(index)}
            name={file.name}
            key={index}
          />
        );
      })}
    </div>
  );
}
