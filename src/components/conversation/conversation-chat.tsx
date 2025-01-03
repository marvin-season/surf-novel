"use client";

import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Message } from "@prisma/client";
import { Message as AiMessage } from "ai/react";

export default function ConversationChat({
  historyMessages,
}: {
  historyMessages: Message[];
}) {
  console.log("historyMessages", historyMessages);
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({});

  useEffect(() => {
    setMessages(historyMessages as AiMessage[]);

    return () => {
      setMessages((prev) => {
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
