"use client";

import { useState } from "react"

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  async function handleSend() {
    if (!input.trim()) return;
    const newMessage: Message = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: newMessage.content }),
    });
    const data = await response.json();
    const assistantMessage: Message = { role:  "assistant", content: data.reply };
    setMessages([...messages, newMessage, assistantMessage]);
  }
  
  return (
    <div className="min-h-screen p-4 bg-white text-black">
      {messages.map((message, index) => (
        <p key={index}>{message.content}</p>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-400 px-2 py-1"
      />
      <button onClick={handleSend} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
        Send</button>
    </div>
  );
}