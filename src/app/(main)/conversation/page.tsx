"use server";

import Link from "next/link";

export default async function ConversationPage() {
  return (
    <div className="flex-1 p-8 pt-6 h-full w-[60%] m-auto">
      开始你的会话吧！
      <Link href={"/conversation/cm5g45d7p0001irom5vnhi8pe"}>历史会话1</Link>
    </div>
  );
}
