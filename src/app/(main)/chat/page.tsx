"use client";

import Chat from "@/components/chat/chat";
import { useEffect } from "react";

export default function ChatPage() {
  return (
    <div className="flex-1 p-8 pt-6 h-full w-[60%] m-auto">
      <Chat />
    </div>
  );
}
