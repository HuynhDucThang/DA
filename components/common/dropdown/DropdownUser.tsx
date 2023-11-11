"use client";

import { useAppDispatch } from "@/redux/hooks";
import { userLogout } from "@/redux/slices/authSlice";
import { currentUserLogout } from "@/redux/slices/userSlice";

export default function DropdownUser() {
  const dispatch = useAppDispatch();

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
          onClick={() => {
            dispatch(currentUserLogout());
            dispatch(userLogout());
          }}
        >
          Đăng xuất
        </div>
      </div>
    </>
  );
}
