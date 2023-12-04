"use client";

import React, { useState, useEffect } from "react";
import "./chat.css"; // Tạo file Chat.css cho thiết kế đặc trưng của Chat component

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useRouter, useSearchParams } from "next/navigation";
import Conversations from "@/components/pages/chat/conversations";
import ChatUI from "@/components/pages/chat/chatUi";
import Infor from "@/components/pages/chat/infor";
import { useAppSelector } from "@/redux/hooks";
import { getCookie, showToast } from "@/utils/helpers/common";

const Chat = () => {
  const [client, setClient] = useState<WebSocket | null>(null);
  const searchParams = useSearchParams();
  const { currentUser } = useAppSelector((state) => state.user);
  const router = useRouter();

  const userId = searchParams.get("uid");
  const receiver_id = searchParams.get("ruid");
  const room = searchParams.get("room");

  useEffect(() => {
    const client = new W3CWebSocket(
      `ws://localhost:8000/ws/private/${userId}/${receiver_id}/${room}`
    );
    setClient(client);
    return () => {
      if (client) {
        client.close();
      }
    };
  }, []);

  if (!currentUser && !getCookie("access_token")) {
    showToast("Bạn chưa đăng nhập", "error");
    router.replace("/");
    return;
  }

  return (
    <div className="flex h-[calc(100vh-100px)] overflow-hidden">
      <Conversations />
      {room ? (
        <>
          <ChatUI client={client} />
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col">
          <div className="text-3xl text-primary font-semibold">
            Hãy chọn một cuộc trò chuyện
          </div>
          <p>Nếu chưa có bạn có thể khởi tạo</p>
        </div>
      )}
      <Infor />
    </div>
  );
};

export default Chat;
