"use client";

import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Suspense, useEffect } from "react";
import { Message } from "@prisma/client";
import { Message as AiMessage } from "ai/react";
import {
  ArrowUp,
  ArrowDown,
  UserCheck2,
  UserIcon,
  Bot,
  Loader2Icon,
} from "lucide-react";
import { RichContent } from "../advanced-rich-editor/ai-feature/ai-completion-result-panel";
import { Separator } from "../ui/separator";

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
    <div className="flex-grow flex flex-col rounded-lg p-2">
      <div className="flex-1">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`gap-2 items-start mt-2 ${message.role === "user" ? "flex flex-row-reverse" : "flex"}`}
          >
            <div className="flex-shrink-0">
              {message.role === "user" ? (
                <UserIcon size={16} />
              ) : (
                <Bot size={16} />
              )}
            </div>
            <div className="p-2 rounded-[8px] border">
              <Suspense fallback={<Loader2Icon />}>
                <RichContent content={message.content} />
              </Suspense>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center bg-white justify-center my-2 sticky bottom-0">
        <form
          className="mt-4 w-[90dvw] flex gap-2 justify-center"
          onSubmit={handleSubmit}
        >
          <Input name="prompt" value={input} onChange={handleInputChange} />
          <Button
            variant={"outline"}
            className="hover:text-blue-500 hover:border-blue-500"
            type="submit"
          >
            Submit
          </Button>
        </form>

        <span className="text-sm text-gray-500">{"engined by aisdk!"}</span>
      </div>
    </div>
  );
}
