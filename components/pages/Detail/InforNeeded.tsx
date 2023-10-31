import { ViewMore } from "@/components/common";

export default function InforNeeded() {
  return (
    <div className="py-8">
      <h4 className="heading__detail_apartment">Những điều cần biết</h4>
      <div className="grid grid-cols-3 gap-10">
        {/* rule 2 */}
        <div className="">
          <h4 className="sub_heading__detail_apartment">Nội quy nhà</h4>
          <p className="text-xl">Nhận phòng sau 15:00</p>
          <p className="text-xl">Trả phòng trước 11:00</p>
          <p className="text-xl">Tối đa 6 khách</p>
          <ViewMore />
        </div>
        
        {/* rule 1*/}
        <div className="">
          <h4 className="sub_heading__detail_apartment">An toàn và chỗ ở</h4>
          <p className="text-xl">
            Chưa có thông tin về việc có máy phát hiện khí CO
          </p>
          <p className="text-xl">Chưa có thông tin về việc có máy báo khói</p>
          <p className="text-xl">Camera an ninh/thiết bị ghi</p>
          <ViewMore />
        </div>

        {/* rule 3 */}
        <div className="">
          <h4 className="sub_heading__detail_apartment">Chính sách hủy</h4>
          <p className="text-xl">Hủy miễn phí trước 2 ngày</p>
          <p className="text-xl">
            Hãy đọc toàn bộ chính sách hủy của Chủ nhà/Người tổ chức được áp
            dụng ngay cả khi bạn hủy vì ốm bệnh hoặc gián đoạn do dịch COVID-19.
          </p>
          <p className="text-xl">Camera an ninh/thiết bị ghi</p>
          <ViewMore />
        </div>
      </div>
    </div>
  );
}
