import { ViewMore } from "@/components/common";
import Image from "next/image";

export default function Desc() {
  return (
    <div className="spacing_between_cpn_detail">
      <p className="heading__detail_apartment">Mô tả</p>
      <p className="line-clamp-5 text-xl">
        Một phòng ngủ lớn và hiện đại này nằm ở rìa của Downtown và Business
        Bay. Nó cung cấp quyền sử dụng độc quyền các tiện nghi theo phong cách
        nghỉ dưỡng của tòa nhà và hoàn hảo cho các cặp đôi, khách đi công tác và
        thậm chí cả khách du lịch một mình. Tận hưởng sự riêng tư, WiFi miễn
        phí, gần các điểm tham quan nổi tiếng và trải nghiệm Dubai như một người
        dân địa phương
      </p>

      <ViewMore />
    </div>
  );
}
