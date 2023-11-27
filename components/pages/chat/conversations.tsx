import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { URL } from "@/utils/api";
import {
  showToast,
  updateMutilpleSearchParams,
  updateSearchParams,
} from "@/utils/helpers/common";
import { IConversation } from "@/utils/interface";
import { getConversationsByUser } from "@/utils/proxy";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Conversations() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await getConversationsByUser(currentUser.id);
        setConversations(data.data);
      } catch (error) {
        console.log("errror ");
      }
    };

    getConversations();
  }, []);

  if (!currentUser.id) {
    showToast("Bạn cần đăng nhập để sử dụng chức năng này", "error");
    router.push("/");
  }

  return (
    <div className="bg-white w-[20%] border">
      {/* search */}
      <div className="p-4 flex items-center">
        <Image src="/search/search_black.svg" alt="" width={24} height={24} />
        <input type="text" name="" placeholder="Search" />
      </div>

      {/* conversations */}
      <div>
        <div className="p-4 border-y">
          <h2>All conversations</h2>
        </div>

        {/* list */}
        <div>
          {/* item */}
          {conversations.length ? (
            conversations.map((conversation) => (
              <Conversation key={conversation.id} conversation={conversation} />
            ))
          ) : (
            <div>Chưa có cuộc trò chuyện nào</div>
          )}
        </div>
      </div>
    </div>
  );
}

interface IConversationProps {
  conversation: IConversation;
}

function Conversation({ conversation }: IConversationProps) {
  const { currentUser } = useAppSelector((state) => state.user);
  const receiverUsers = conversation.members.filter(
    (member) => member.user_id !== currentUser.id
  );

  const router = useRouter();

  const avatar = receiverUsers?.[0].user.avatar;

  const handleChooseConversation = () => {
    const url = updateMutilpleSearchParams({
      room: conversation.id,
      uid: currentUser.id,
      ruid: receiverUsers?.[0]?.user_id,
    });
    router.replace(url, { scroll: false });
  };

  return (
    <div
      className="flex gap-4 items-center border-y p-4 cursor-pointer hover:bg-slate-100"
      onClick={handleChooseConversation}
    >
      <Image
        src={avatar ? `${URL}/${avatar}` : "/avatar_none_user.svg"}
        alt="avatar"
        width={40}
        height={40}
      />
      <div>
        <h2>{receiverUsers?.[0].user.username}</h2>
        <p>Helllo</p>
      </div>
    </div>
  );
}
