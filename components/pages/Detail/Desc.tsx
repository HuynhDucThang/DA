"use client";

import { ViewMore } from "@/components/common";
import { useEffect, useRef, useState } from "react";

export default function Desc() {
  const [isShowAll, setIsShowAll] = useState<boolean>(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    // Kiểm tra khi nào đoạn văn bản đủ 2 dòng để hiển thị nút "Đọc tất cả"
    if (textRef.current) {
      const { clientHeight, scrollHeight } = textRef.current;
      console.log("clientHeight: ", clientHeight);
      console.log("scrollHeight: ", scrollHeight);

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
        Một phòng ngủ lớn và hiện đại này nằm ở rìa của Downtown và Business
        Bay. Nó cung cấp quyền sử dụng độc quyền các tiện nghi theo phong cách
        nghỉ dưỡng của tòa nhà và hoàn hảo cho các cặp đôi, khách đi công tác và
        thậm chí cả khách du lịch một mình. Tận hưởng sự riêng tư, WiFi miễn
        phí, gần các điểm tham quan nổi tiếng và trải nghiệm Dubai như một người
        dân địa phương
      </p>

      <ViewMore
        title={isShowAll ? "Thu gọn" : "Hiển thị thêm"}
        handleClick={handleReadMore}
      />
    </div>
  );
}
