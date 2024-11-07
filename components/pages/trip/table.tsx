"use client";

import { useState } from "react";
import Image from "next/image";
import { URL } from "@/utils/api";
import { useAppSelector } from "@/redux/hooks";
import WrapProjectsTable from "./wrapTable";
import { Loading } from "@/components/common";
import Confirm from "@/components/layouts/modal/comfirm";
import useModal from "@/utils/hook/useModal";
import { handleConvertDate, showToast } from "@/utils/helpers/common";
import { useRouter } from "next/navigation";
import { IResponseApartmentContract } from "@/utils/interface.v2";

interface IProps {
  data: IResponseApartmentContract[];
  changePage: number;
  totalPage: number;
  onDelete: (id: string) => void;
  setChangePage: (changePage: number) => void;
}
//changeStatusProject
export default function Table({
  data,
  changePage,
  totalPage,
  onDelete,
  setChangePage,
}: IProps) {
  const { isOpen, closePopup, openPopup } = useModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typeAction, setTypeAction] = useState<"delete" | "redirect">();
  const [projectDashboard, setProjectDashboard] =
    useState<IResponseApartmentContract>();
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();

  const handleOpenPopup = (action: "delete" | "redirect", project: any) => {
    const isTripCompleted = new Date() > new Date(project.start_date);
    if (isTripCompleted) {
      showToast("Chuyến đi của bạn đã bắt đầu không thể xoá", "error");
      return;
    }
    setTypeAction(action);
    setProjectDashboard(project);
    openPopup();
  };

  const handleClickAction = async () => {
    if (!projectDashboard) return;
    if (typeAction === "delete") {
      onDelete(projectDashboard._id);
    } else if (typeAction === "redirect") {
      router.push(`/apartment/${projectDashboard.apartment._id}`);
    }
    closePopup();
  };

  return (
    <>
      <div className="mt-6 rounded-[15px] overflow-hidden shadow-xl">
        <WrapProjectsTable
          stylesCommon="py-[11px] border-b border-[#ccc] bg-[#67349d]"
          title="Tất cả chuyến đi của tôi"
          totalPage={totalPage}
          changePage={changePage}
          setChangePage={setChangePage}
        >
          <div className="tasksctroll">
            <div className="overflow-hidden mt-4 pb-6 px-2 w-[clamp(1200px,100%,100%)] abcxyz ">
              <table className="w-full ">
                <thead className="">
                  <tr>
                    <th className="text-center border-none font-bold text-[18px] text-[#474d58] mt-4 pb-3">
                      Stt
                    </th>
                    <th className="text-center border-none font-bold text-[18px] text-[#474d58] pb-3">
                      Ảnh căn hộ
                    </th>
                    <th className="text-center border-none font-bold text-[18px] text-[#474d58] pb-3">
                      Tên căn hộ
                    </th>
                    <th className="text-center border-none font-bold text-[18px] text-[#474d58] pb-3">
                      Email người thuê
                    </th>
                    <th className="text-center border-none font-bold text-[18px] text-[#474d58] pb-3">
                      Tổng số tiền
                    </th>
                    <th className="text-center border-none font-bold text-[18px] text-[#474d58] pb-3">
                      Ngày bắt đầu
                    </th>
                    <th className="text-center border-none font-bold text-[18px] text-[#474d58] pb-3">
                      Ngày kết thúc
                    </th>
                    <th className="text-center border-none pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((project, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-[#d1f3ff]"
                    >
                      <td className="text-center border-none w-[80px] font-medium py-2">
                        <p className="text-[14px] text-[#67349d]">
                          {(changePage - 1) * 6 + index + 1}
                        </p>
                      </td>
                      <td className="flex justify-center w-full text-center border-none py-2">
                        <div className="text-[14px] text-[#9b9aba] flex rounded-full overflow-hidden ">
                          {project?.apartment?.images[1] ? (
                            <Image
                              src={
                                project.apartment.images[1]
                                  ? `${project.apartment.images[1]}`
                                  : "/icons/dashboard/user-new.png"
                              }
                              width={60}
                              height={60}
                              alt=""
                            />
                          ) : null}

                          {project?.apartment?.images[2] ? (
                            <Image
                              src={
                                project.apartment.images[2]
                                  ? `${project.apartment.images[2]}`
                                  : "/icons/dashboard/user-new.png"
                              }
                              width={60}
                              height={60}
                              alt=""
                              className="-ml-2"
                            />
                          ) : null}

                          {project?.apartment?.images[3] ? (
                            <Image
                              src={
                                project.apartment.images[3]
                                  ? `${project.apartment.images[3]}`
                                  : "/icons/dashboard/user-new.png"
                              }
                              width={60}
                              height={60}
                              alt=""
                              className="-ml-2"
                            />
                          ) : null}
                        </div>
                      </td>
                      <td className="font-medium text-center border-none max-w-[150px] whitespace-normal text-[#67349d] text-[14px]">
                        {project.apartment.name}
                      </td>

                      <td className="font-medium text-center border-none max-w-[300px] whitespace-normal text-[#67349d] text-[14px]">
                        {currentUser.email}
                      </td>

                      <td className="font-medium text-center border-none">
                        <p className="text-[14px] text-[#67349d]">
                          ${project?.information?.totalPrice}
                        </p>
                      </td>
                      <td className="font-medium text-center border-none w-[150px]">
                        <p className="text-[14px] text-[#67349d]">
                          14h:00,
                          {handleConvertDate(
                            new Date(project?.startDate),
                            "dd/MM/yyyy"
                          )}{" "}
                        </p>
                      </td>

                      <td className="font-medium text-center border-none w-[150px]">
                        <p className="text-[14px] text-[#67349d]">
                          12h:00,{" "}
                          {handleConvertDate(
                            new Date(project?.endDate),
                            "dd/MM/yyyy"
                          )}{" "}
                        </p>
                      </td>
                      <td className="border-none">
                        <div className="flex items-center gap-3 justify-center">
                          <div
                            className="group p-1 rounded-full"
                            onClick={() => handleOpenPopup("redirect", project)}
                          >
                            <Image
                              className="cursor-pointer group-hover:-translate-y-2 transition-transform"
                              src={"/redirect.svg"}
                              width={24}
                              height={24}
                              alt="Lock icon"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </WrapProjectsTable>
      </div>

      {isLoading ? <Loading /> : null}
      {isOpen ? (
        <Confirm
          isOpen={isOpen}
          message={
            typeAction === "delete"
              ? "Bạn có muốn xoá chuyển đi này này."
              : "Bạn có muốn di chuyển đến căn hộ này."
          }
          onCancel={closePopup}
          onOk={handleClickAction}
          onClickOutSide={closePopup}
        />
      ) : null}
    </>
  );
}
