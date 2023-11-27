"use client";

import React, { useState, useEffect } from "react";
import "./chat.css"; // Tạo file Chat.css cho thiết kế đặc trưng của Chat component

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSearchParams } from "next/navigation";
import Conversations from "@/components/pages/chat/conversations";
import ChatUI from "@/components/pages/chat/chatUi";
import Infor from "@/components/pages/chat/infor";
import { useAppSelector } from "@/redux/hooks";

const Chat = () => {
  const searchParams = useSearchParams();
  const room = searchParams.get("room");

  return (
    <div className="flex h-[calc(100vh-100px)] overflow-hidden">
      <Conversations />
      {room ? (
        <>
          <ChatUI />
          <Infor />
        </>
      ) : null}
    </div>
  );
};

export default Chat;
