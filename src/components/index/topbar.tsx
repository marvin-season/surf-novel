import { auth } from "@/auth";
import { Notebook, NotebookPen, User2Icon } from "lucide-react";
import Link from "next/link";

export default async function TopBar() {
  const session = await auth();
  console.log("session", session);

  return (
    <div className="flex justify-between py-4 px-8 border-b sticky top-0 z-10 backdrop-blur-sm mb-4 gap-4">
      {session?.user ? (
        <Link href={"/notes"} className="rounded-[8px] text-sm">
          <NotebookPen size={16} />
        </Link>
      ) : (
        <Link
          href="/login"
          className="rounded-[8px] border px-2 py-1 border-blue-500 text-blue-500 text-sm"
        >
          登陆使用
        </Link>
      )}

      {session?.user && (
        <div className="flex gap-2">
          <span className="text-sm">{session.user.email}</span>
          <User2Icon size={16} />
        </div>
      )}
    </div>
  );
}
