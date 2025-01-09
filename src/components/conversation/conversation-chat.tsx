"use client";

import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Message } from "@prisma/client";
import { Message as AiMessage } from "ai/react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function ConversationChat({
  historyMessages,
  conversationId,
}: {
  historyMessages: Message[];
  conversationId: string;
}) {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      generateId: () => "1",
      body: {
        conversationId: conversationId === "0" ? undefined : conversationId,
      },
    });

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
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            className={`gap-2  ${message.role === "user" ? "flex flex-row-reverse text-blue-400" : "flex"}`}
          >
            <div className="flex-shrink-0">
              {message.role === "user" ? <ArrowUp /> : <ArrowDown />}
            </div>
            <div>{message.content}</div>
          </div>
        ))}
      </div>

      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input name="prompt" value={input} onChange={handleInputChange} />
        <Button
          variant={"outline"}
          className="hover:text-blue-500 hover:border-blue-500"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
