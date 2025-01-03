"use client";

import { Conversation } from "@prisma/client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function ({ conversations }: { conversations: Conversation[] }) {
  const segement = useSelectedLayoutSegment();
  return (
    <>
      <div>
        {conversations.map((conversation) => {
          return (
            <Link
              className={`p-2 border rounded-[8px] text-sm ${conversation.id === segement ? "text-blue-500 border-blue-500" : ""}`}
              href={`/conversation/${conversation.id}`}
            >
              {conversation.name}
            </Link>
          );
        })}
      </div>
    </>
  );
}
