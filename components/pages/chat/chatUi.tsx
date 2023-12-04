"use client";

import React, { useState, useEffect, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import Message from "./message";
import { useAppSelector } from "@/redux/hooks";
import { createMessage, getMessageRoom } from "@/utils/proxy";
import { IMessage } from "@/utils/interface";
import { handleConvertDate, showToast } from "@/utils/helpers/common";
import { Loading } from "@/components/common";

interface IProps {
  client: WebSocket | null;
}

export default function ChatUI({ client }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { text: string; sender: string; avatar: string }[]
  >([]);
  const [message, setMessage] = useState("");

  const [conversationMessage, setConversationsMessage] = useState<IMessage[]>(
    []
  );

  const searchParams = useSearchParams();
  const room = searchParams.get("room");

  const { currentUser } = useAppSelector((state) => state.user);
  const { receiverUser } = useAppSelector((state) => state.userStore);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatContainerRef.current) return;
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [conversationMessage, messages]);

  useEffect(() => {
    if (!client) return;

    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      alert("data");
      setMessages((pre) => [...pre, data]);
    };
  }, [client]);

  useEffect(() => {
    const getConversations = async () => {
      setIsLoading(true);
      try {
        const { data } = await getMessageRoom(room!);
        setConversationsMessage(data.data);
      } catch (error) {
        console.log("errror ");
      } finally {
        setIsLoading(false);
      }
    };

    if (room) getConversations();
  }, [room]);

  const handleOnChange = (value: string) => {
    setMessage(value);
  };

  const handleMessageRealTime = () => {
    if (message.trim() !== "" && client) {
      const messageObject = {
        text: message,
        sender: currentUser.id,
        avatar: currentUser.avatar,
      };
      const jsonString = JSON.stringify(messageObject);
      client.send(jsonString);
      setMessages([
        ...messages,
        { text: message, sender: currentUser.id, avatar: currentUser.avatar },
      ]);
      setMessage("");
    }
  };

  const handleSendMessage = async () => {
    if (!room) return;

    try {
      await createMessage({
        sender_id: currentUser.id,
        content: message,
        room_id: room,
      });
      handleMessageRealTime();
      showToast("Gửi thành công");
    } catch (error) {
      showToast("Không thể gửi tin nhắn", "error");
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="flex-1 flex flex-col bg-[#f8f9fd]">
        {/* heading */}
        <div className="p-4 flex items-center justify-between border-y bg-white shadow-lg">
          <h2>To : <span className="text-xl">{receiverUser?.username}</span></h2>
          <Image src="/search/search_black.svg" alt="" width={24} height={24} />
        </div>

        {/* chat */}
        <div ref={chatContainerRef} className="p-4 flex-1 overflow-y-auto">
          <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col ">
              {conversationMessage?.length < 1 && messages.length < 1 ? (
                <div className="w-full h-full flex justify-center items-center flex-col">
                  <div className="text-3xl text-primary font-semibold">
                    Bạn hãy chat một cái gì đó đi
                  </div>
                </div>
              ) : null}
              {conversationMessage?.length
                ? conversationMessage.map((message) => (
                    <Message
                      key={message.id}
                      senderID={message.id}
                      content={message.content}
                      avatar={message?.user.avatar}
                      create_at={handleConvertDate(
                        new Date(message.created_at)
                      )}
                      userType={
                        currentUser.id === message.sender_id
                          ? "sender"
                          : "receiver"
                      }
                    />
                  ))
                : null}

              {messages.map((message, index) => (
                <Message
                  key={index}
                  senderID={message.sender}
                  content={message.text}
                  avatar={message.avatar}
                  create_at={handleConvertDate(new Date())}
                  userType={
                    currentUser.id === message.sender ? "sender" : "receiver"
                  }
                />
              ))}
            </div>

            <div className="sticky bottom-0 bg-white shadow-lg mt-auto">
              <div className="p-4 flex items-center">
                <Image
                  src="/search/search_black.svg"
                  alt=""
                  width={24}
                  height={24}
                />

                <input
                  type="text"
                  placeholder="Type a message here"
                  className="flex-1 p-4 outline-none"
                  value={message}
                  onChange={(e) => handleOnChange(e.target.value)}
                />

                {/* icons */}
                <div className="flex items-center gap-3">
                  <Image
                    src="/search/search_black.svg"
                    alt=""
                    width={24}
                    height={24}
                  />

                  <div
                    className="bg-[#009975] p-3 rounded-full cursor-pointer"
                    onClick={handleSendMessage}
                  >
                    <Image src="/send.svg" alt="" width={24} height={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
