import { URL } from "@/utils/api";
import { handleConvertDate } from "@/utils/helpers/common";
import { IMessage } from "@/utils/interface";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  userType: "sender" | "receiver";
  avatar: string;
  create_at: string;
  content: string;
  senderID: string;
}

export default function Message({
  senderID,
  content,
  userType,
  avatar,
  create_at,
}: IProps) {
  return (
    <div className="mb-8">
      <div className={`flex gap-6`}>
        {userType === "receiver" ? (
          <Link
            href={`/user/${senderID}`}
            className="w-[48px] h-[48px] shadow-lg rounded-full overflow-hidden relative"
          >
            <Image
              src={avatar ? `${URL}/${avatar}` : "/avatar_none_user.svg"}
              alt=""
              fill
            />
          </Link>
        ) : null}
        <div
          className={`flex flex-col max-w-[70%]  ${
            userType === "sender" && "ml-auto"
          }`}
        >
          <div
            className={`${
              userType === "sender" ? "bg-[#1d88f6] text-white" : "bg-white"
            } text-lg rounded-xl p-3 `}
          >
            {content}
          </div>
          <span className="text-txt-second mt-2">{create_at}</span>
        </div>
      </div>
    </div>
  );
}
