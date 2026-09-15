export interface Conversation {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}


export const conversations: Conversation[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Alice" },
  { id: 3, name: "Bob" },
];

export const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      sender: "John",
      text: "Hello!",
      time: "10:30",
    },
  ],

  2: [
    {
      id: 2,
      sender: "Alice",
      text: "Hi there!",
      time: "11:00",
    },
  ],

  3: [],
};


export  function Sidebar({
  conversations,
  selectedChat,
  setSelectedChat,
}) {
  return (
    <div className="sidebar">
      {conversations.map((chat) => (
        <div
          key={chat.id}
          className={
            selectedChat === chat.id
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedChat(chat.id)
          }
        >
          {chat.name}
        </div>
      ))}
    </div>
  );
}


import { useState } from "react";

export  function ChatApp() {
  const [selectedChat, setSelectedChat] = useState(1);

  const [messages, setMessages] = useState(initialMessages);

  return (
    <div className="app">
      <Sidebar
        conversations={conversations}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />

      <ChatWindow
        chatId={selectedChat}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}




export  function ChatWindow({
  chatId,
  messages,
  setMessages,
}) {
  return (
    <div className="chatWindow">
      <div className="messages">
        {messages[chatId].map((msg) => (
          <div key={msg.id}>
            <b>{msg.sender}</b>

            <p>{msg.text}</p>

            <small>{msg.time}</small>
          </div>
        ))}
      </div>

      <MessageInput
        chatId={chatId}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}



export  function MessageInput({
  chatId,
  messages,
  setMessages,
}) {
  const [text, setText] = useState("");

  function sendMessage() {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "Me",
      text,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => ({
      ...prev,

      [chatId]: [
        ...prev[chatId],
        newMessage,
      ],
    }));

    setText("");
  }

  return (
    <div className="inputBox">
      <input
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
