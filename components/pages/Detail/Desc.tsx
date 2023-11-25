"use client";

import { ViewMore } from "@/components/common";
import { useEffect, useRef, useState } from "react";

interface IProps {
  text: string;
}

export default function Desc({ text }: IProps) {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    // Kiểm tra khi nào đoạn văn bản đủ 2 dòng để hiển thị nút "Đọc tất cả"
    if (textRef.current) {
      const { clientHeight, scrollHeight } = textRef.current;
      if (clientHeight >= scrollHeight) {
        setIsShowAll(true);
      }
    }
  }, []);

  const handleReadMore = () => {
    setIsShowAll((pre) => !pre);
  };

  return (
    <div className="spacing_between_cpn_detail">
      <p className="heading__detail_apartment">Mô tả</p>
      <p className={`${!isShowAll && "line-clamp-2"} text-xl`} ref={textRef}>
        {text}
      </p>
      {!isShowAll ? (
        <ViewMore
          title={isShowAll ? "Thu gọn" : "Hiển thị thêm"}
          handleClick={handleReadMore}
        />
      ) : null}
    </div>
  );
}
