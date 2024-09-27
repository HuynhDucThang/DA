import { Loading } from "@/components/common";
import { useAppSelector } from "@/redux/hooks";
import { handleConvertDate } from "@/utils/helpers/common";
import { IResponseApartment } from "@/utils/interface.v2";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  apartmentDetail: IResponseApartment;
}

export default function TitleDetail({ apartmentDetail }: IProps) {
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const handleContact = async () => {
  //   if (!currentUser.id) {
  //     showToast("Bạn hãy đăng nhập để xử dụng tính năng này ", "error");
  //     return;
  //   }
  //   setIsLoading(true);
  //   try {
  //     const { data } = await getRoomUsers(currentUser.id, owner.id);
  //     let roomId = data?.data?.id ?? "";
  //     if (!data.data) {
  //       const { data: dataRoom } = await createRoomChat({
  //         key: `${currentUser.id}-${owner.id}`,
  //         name: `${currentUser.username}-${owner.username}`,
  //         users_id: [currentUser.id, owner.id],
  //       });

  //       roomId = dataRoom.data.id;
  //     }

  //     router.push(
  //       `/chat?room=${roomId}&uid=${currentUser.id}&ruid=${owner.id}`
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="spacing_between_cpn_detail">
        <div className="">
          <h3 className="text-3xl font-semibold text-primary">
            Toàn bộ căn hộ cho thuê {apartmentDetail.name}
          </h3>
          <div className="flex gap-2">
            <p className="text_apartment_detail font-normal">4 khách</p>
            <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
            <p className="text_apartment_detail font-normal">
              {apartmentDetail.rooms.bedRoom} phòng ngủ
            </p>
            <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
            <p className="text_apartment_detail font-normal">
              {apartmentDetail.rooms.livingRoom} phòng khách
            </p>
            <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
            <p className="text_apartment_detail font-normal">
              {apartmentDetail.rooms.bathRoom} phòng tắm
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-6 items-center">
          <div className="relative w-[10%] aspect-[1/1] overflow-hidden rounded-full">
            <Image
              src={
                apartmentDetail.owner?.avatar
                  ? apartmentDetail.owner?.avatar
                  : "/avatar_none_user.svg"
              }
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl text-txt-primary font-medium">
              Chủ nhà {apartmentDetail.owner?.username}
            </h2>
            <p className="text-txt-second text-xl">
              Đã tham gia vào{" "}
              {apartmentDetail?.owner?.created_at &&
                handleConvertDate(new Date(apartmentDetail?.owner?.created_at))}
            </p>
          </div>

          {currentUser.id !== apartmentDetail?.owner?.id ? (
            <div
              className="w-[20%] border-2 border-black rounded-xl h-full p-4 text-xl font-medium cursor-pointer transition-all hover:bg-black hover:text-white"
              // onClick={handleContact}
            >
              Liên hệ chủ nhà
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
