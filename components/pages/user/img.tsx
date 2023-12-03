import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
    blob_url: any;
    name: string;
    handleClick: () => void;
  }
  
  export function Img({ blob_url, name, handleClick }: Props) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const parentElement = useRef<HTMLDivElement>(null);
    const childElement = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const parent = parentElement?.current;
      const child = childElement?.current;
  
      if (parent && child) {
        const rect = parent.getBoundingClientRect();
        const leftPosition = rect.left;
        const topPosisiton = rect.top;
  
        child.style.transformOrigin = `${topPosisiton}px ${leftPosition}px`;
      }
    }, []);
  
    const showPopup = () => {
      setIsActive(true);
    };
  
    const hiddenPopup = () => {
      setIsActive(false);
    };
  
    return (
      <div
        ref={parentElement}
        className="relative aspect-[1/1] rounded-lg flex items-center justify-center border-[1px] border-solid border-[#cfcfcf] bg-[#f8f8f8] group cursor-pointer"
      >
        <Image
          src={blob_url}
          alt="img data"
          fill
          className="object-cover rounded-lg p-2 "
        />
  
        <div className="bg-[#0000004d] invisible opacity-0 absolute w-full h-full left-0 top-0 flex items-center justify-center gap-2 transition-all group-hover:visible group-hover:opacity-100">
          <Image
            src="/bin.svg"
            alt="bin icon"
            width={30}
            height={30}
            className="transition-all opacity-80 hover:opacity-100 hover:scale-105"
            onClick={handleClick}
          />
          <Image
            src="/eye.svg"
            alt="eye icon"
            width={30}
            height={30}
            className="transition-all opacity-80 hover:opacity-100 hover:scale-105"
            onClick={showPopup}
          />
        </div>
  
        <div
          className={`fixed bg-[#0003] z-[1000] top-0 left-0 right-0 bottom-0 flex items-center justify-center transition-all ${
            isActive ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            ref={childElement}
            className={`bg-white rounded-lg w-[540px] min-w-[400px] transition-all p-5 ${
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 "
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-txt-primary text-base font-bold">{name}</h2>
              <Image
                width={34}
                height={34}
                src="/close_black.svg"
                alt="icon close"
                onClick={hiddenPopup}
              />
            </div>
            <div className="aspect-[3/2] relative">
              <Image
                src={blob_url}
                alt="img large"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  