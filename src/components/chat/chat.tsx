"use client";

import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({});

  useEffect(() => {
    return () => {
      setMessages((prev) => {
        console.log("messages", prev);
        return [];
      });
    };
  }, []);
  return (
    <div className="flex-grow flex flex-col h-full border rounded-lg p-4">
      <div className="flex-1">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? "User: " : "AI: "}
            {message.content}
          </div>
        ))}
      </div>

      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input name="prompt" value={input} onChange={handleInputChange} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
