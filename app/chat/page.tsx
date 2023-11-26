"use client";

import React, { useState, useEffect } from "react";
import "./chat.css"; // Tạo file Chat.css cho thiết kế đặc trưng của Chat component

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useSearchParams } from "next/navigation";

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");
  const [client, setClient] = useState<WebSocket | null>(null);

  const searchParams = useSearchParams();

  const userId = searchParams.get("uid");
  const receiver_id = searchParams.get("ruid");
  const room = searchParams.get("room");


  useEffect(() => {
    const client = new W3CWebSocket(`ws://localhost:8000/ws/private/${userId}/${receiver_id}/${room}`);
    setClient(client);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      setMessages(pre=> [...pre, data]);
    };

    return () => {
      client.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && client) {
      const messageObject = { text: newMessage, sender: "user" };
      const jsonString = JSON.stringify(messageObject);
      client.send(jsonString);
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="border-b p-4">
        <h1 className="text-2xl font-semibold">Chat App</h1>
      </div>
      <div className="flex-1 overflow-y-scroll p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-2 p-2 ${
              message.sender === "user"
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="mt-2 p-2 bg-blue-500 text-white"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
