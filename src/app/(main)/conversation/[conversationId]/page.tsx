"use client";

import Chat from "@/components/chat/chat";
import { use } from "react";

export default function ChatPage({
  params,
}: {
  params: Promise<{
    conversationId: string;
  }>;
}) {
  console.log("params", params);
  return (
    <div className="flex-1 p-8 pt-6 h-full w-[60%] m-auto">
      <Chat />
    </div>
  );
}
