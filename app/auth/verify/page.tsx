"use client";
import { Loading } from "@/components/common";
import { verifyUser } from "@/utils/proxy";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  searchParams: {
    id: string;
    code: string;
  };
}

export default function VerifyUser({ searchParams }: IProps) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onVerifyUser = async () => {
    if (!searchParams.code || !searchParams.id) return;
    setIsFetching(true);
    try {
      await verifyUser(searchParams.id, searchParams.code);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      {isFetching ? <Loading /> : null}
      <div className="w-full h-screen flex_center flex-col gap-6">
        <h2 className="text-2xl font-bold">Air BnB xác thực người dùng</h2>

        {isSuccess ? (
          <div className="">
            Xác thực thành công, bạn có thể đóng tab hoặc{" "}
            <Link className="underline" href={"/"}>
              bấm vào đây để quay lại trang chính
            </Link>
          </div>
        ) : (
          <div className="cursor-pointer underline" onClick={onVerifyUser}>
            Bấm vào đây để xác thực
          </div>
        )}
      </div>
    </>
  );
}
