import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { URL } from "@/utils/api";
import {
  showToast,
  updateMutilpleSearchParams,
  updateSearchParams,
} from "@/utils/helpers/common";
import { IConversation } from "@/utils/interface";
import { getConversationsByUser } from "@/utils/proxy";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addReceiverUser, removeReceiverUser } from "@/redux/slices/userStore";

export default function Conversations() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { currentUser } = useAppSelector((state) => state.user);
  const { receiverUser } = useAppSelector((state) => state.userStore);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const room = searchParams.get("room");
  const receiver_id = searchParams.get("ruid");

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
  }, [currentUser.id]);

  useEffect(() => {
    if (!room && !receiver_id && conversations) {
      dispatch(removeReceiverUser());
    }
  }, [room, receiver_id, receiverUser]);

  useEffect(() => {
    if (!room || !receiver_id || conversations.length < 1) return;
    const chatRoomContainReceiver = conversations.find(
      (conversation) => conversation.id === room
    );

    console.log("chatRoomContainReceiver : ", chatRoomContainReceiver);

    if (chatRoomContainReceiver) {
      const receiverUserInCurrentChat = chatRoomContainReceiver.members.find(
        (member) => member.user_id !== currentUser.id
      );
      dispatch(addReceiverUser(receiverUserInCurrentChat?.user ?? null));
    }
  }, [room, receiver_id, conversations]);

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
          <h2>Tất cả cuộc trò chuyện</h2>
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

  const avatar = receiverUsers?.[0]?.user?.avatar;

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
      <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full">
        <Image
          src={avatar ? `${URL}/${avatar}` : "/avatar_none_user.svg"}
          alt="avatar"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2>{receiverUsers?.[0]?.user?.username}</h2>
        <p>Online</p>
      </div>
    </div>
  );
}
