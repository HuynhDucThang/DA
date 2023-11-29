import { useAppSelector } from "@/redux/hooks";
import { URL } from "@/utils/api";
import { handleConvertDate, showToast } from "@/utils/helpers/common";
import { IApartmentRead, IUser } from "@/utils/interface";
import { getRoomUsers } from "@/utils/proxy";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  apartmentDetail: IApartmentRead;
  owner: IUser;
}

export default function TitleDetail({ apartmentDetail, owner }: IProps) {
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();

  const handleContact = async () => {
    if (!currentUser.id) {
      showToast("Bạn hãy đăng nhập để xử dụng tính năng này ", "error");
      return;
    }

    try {
      const { data } = await getRoomUsers(currentUser.id, "1");

      if (data.data) {
        router.push(
          `/chat?room=${data.data.id}&uid=${currentUser.id}&ruid=${owner.id}`
        );
      }
    } catch (error) {}
  };

  return (
    <div className="spacing_between_cpn_detail">
      <div className="">
        <h3 className="text-3xl font-semibold text-primary">
          Toàn bộ căn hộ cho thuê {apartmentDetail.name}
        </h3>
        <div className="flex gap-2">
          <p className="text_apartment_detail font-normal">4 khách</p>
          <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
          <p className="text_apartment_detail font-normal">
            {apartmentDetail.num_bedrooms} phòng ngủ
          </p>
          <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
          <p className="text_apartment_detail font-normal">
            {apartmentDetail.num_living_rooms} phòng khách
          </p>
          <Image src="/dot.svg" alt="dot icon" width={10} height={10} />
          <p className="text_apartment_detail font-normal">
            {apartmentDetail.num_bathrooms} phòng tắm
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-6 items-center">
        <div className="relative w-[10%] aspect-[1/1] overflow-hidden rounded-full">
          <Image
            src={
              owner?.avatar
                ? `${URL}/${owner?.avatar}`
                : "/avatar_none_user.svg"
            }
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl text-txt-primary font-medium">
            Chủ nhà {owner?.username}
          </h2>
          <p className="text-txt-second text-xl">
            Đã tham gia vào {owner?.created_at && handleConvertDate(new Date(owner?.created_at))}
          </p>
        </div>

        {currentUser.id !== owner?.id ? (
          <div
            className="w-[20%] border-2 border-black rounded-xl h-full p-4 text-xl font-medium cursor-pointer transition-all hover:bg-black hover:text-white"
            onClick={handleContact}
          >
            Liên hệ chủ nhà
          </div>
        ) : null}
      </div>
    </div>
  );
}
