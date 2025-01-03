"use server";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default async function ConversationPage() {
  return (
    <div className="flex-1 p-8 pt-6 h-full w-[60%] m-auto flex justify-center items-center">
      <div className="text-gray-400 text-[20px] flex gap-2 items-center cursor-pointer">
        <MessageCircle size={20} />
        <Link href={"/conversation/0"}>开始新会话</Link>
      </div>
    </div>
  );
}
