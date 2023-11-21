"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeModalType } from "@/redux/slices/modalSlice";
import { RootState } from "@/redux/store";
import Modal from "@/components/common/modal/Modal";
import Image from "next/image";
import {
  DATA_CANCEL_POLICY,
  DATA_HOUSE_ROLE,
  DATA_SAFETY_AND_ACCOMMONDATION,
} from "@/utils/constant";

export default function ModalHouseRole() {
  const { typeModal } = useAppSelector((state: RootState) => state.modal);
  const dispatch = useAppDispatch();

  const dataModal = {
    HOUSE_ROLE: {
      title: "Nội quy nhà",
      desc: "Vì nơi bạn ở là nhà riêng của người khác nên hãy cẩn thận và tôn trọng khi sử dụng nhé.",
      data: DATA_HOUSE_ROLE,
    },
    SAFETY_AND_ACCOMMONDATION: {
      title: "An toàn và chỗ ở",
      desc: "Tránh bị bất ngờ bằng cách kiểm tra những thông tin quan trọng sau đây về khu nhà của Chủ nhà.",
      data: DATA_SAFETY_AND_ACCOMMONDATION,
    },
    CANCEL_POLICY: {
      title: "Chính sách hủy",
      desc: "Trước khi bạn đặt phòng/đặt chỗ, hãy đảm bảo chính sách hủy của Chủ nhà/Người tổ chức này phù hợp với bạn. Xin lưu ý rằng chính sách Trường hợp bất khả kháng của Airbnb không áp dụng cho các trường hợp hủy vì ốm bệnh hoặc gián đoạn đi lại do dịch COVID-19.",
      data: DATA_CANCEL_POLICY,
    },
  };

  const dataChoose = dataModal[typeModal as keyof typeof dataModal];

  return (
    <Modal
      isOpen={
        typeModal &&
        ["HOUSE_ROLE", "SAFETY_AND_ACCOMMONDATION", "CANCEL_POLICY"].includes(
          typeModal
        )
          ? true
          : false
      }
      handleCloseModal={() => dispatch(removeModalType())}
      commonStyles="max-w-[800px]"
      title="Chào mừng bạn đến với Airbnb."
    >
      <div className="h-[60vh] overflow-y-auto p-4 -mr-3">
        <h2 className="text-3xl text-primary font-semibold">
          {dataChoose.title}
        </h2>
        <p className="text-lg my-3">{dataChoose.desc}</p>

        <div>
          {dataChoose.data.map((item, ind) => (
            <div key={ind} className="pt-3 pb-4">
              <h2 className="text-xl text-txt-primary font-semibold">
                {item.key}
              </h2>
              <div>
                {item.subItems.map((subItem, subInd) => (
                  <div
                    key={subInd}
                    className={`flex py-4 gap-4 ${
                      subInd !== 0 && "border-t border-c-grey"
                    }`}
                  >
                    <Image src={subItem.icon} alt="" width={30} height={30} />
                    <p className="text-primary text-lg font-normal">
                      {subItem.subKey}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
