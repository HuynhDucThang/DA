export default function DropdownUser() {
  return (
    <>
      <div>
        <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
          Tin nhắn
        </div>
        <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
          Thông báo
        </div>
        <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
          Chuyển đi
        </div>
        <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
          Danh sách yêu thích
        </div>
      </div>
      {/*  */}
      <div className="border-t">
        <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
          Cho thuê chỗ ở qua Airbnb
        </div>
        <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
          Tài khoản
        </div>
      </div>

      {/*  */}
      <div className="border-t">
        <div className="text-primary text-base p-3 font-medium hover:bg-slate-300">
          Trung tâm trợ giúp
        </div>
        <div
          className="text-primary text-base p-3 font-medium hover:bg-slate-300"
          onClick={() => alert("on click")}
        >
          Đăng xuất
        </div>
      </div>
    </>
  );
}
