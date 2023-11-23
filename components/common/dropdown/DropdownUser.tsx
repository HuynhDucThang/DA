"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userLogout } from "@/redux/slices/authSlice";
import { currentUserLogout } from "@/redux/slices/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

const stylesItem = "text-primary text-base p-3 font-medium hover:bg-slate-300";

export default function DropdownUser() {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <>
      <div>
        <div className={`${stylesItem}`}>Tin nhắn</div>
        <div className={`${stylesItem}`}>Thông báo</div>
        <Link href={`/trip`} className={`block ${stylesItem}`}>
          Chuyển đi
        </Link>
        <Link
          href={`/users/${currentUser.id}/white-list`}
          prefetch={false}
          className={`block ${stylesItem}`}
        >
          Danh sách yêu thích
        </Link>
      </div>
      {/*  */}
      <div className="border-t">
        <div className={`${stylesItem}`}>Cho thuê chỗ ở qua Airbnb</div>
        <Link
          href={`/users/${currentUser.id}`}
          prefetch={false}
          className={`block ${stylesItem}`}
        >
          Tài khoản
        </Link>
      </div>

      {/*  */}
      <div className="border-t">
        <div className={`${stylesItem}`}>Trung tâm trợ giúp</div>
        <div
          className={`${stylesItem}`}
          onClick={() => {
            dispatch(currentUserLogout());
            dispatch(userLogout());
            router.push("/");
          }}
        >
          Đăng xuất
        </div>
      </div>
    </>
  );
}
