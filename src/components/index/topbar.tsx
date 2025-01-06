import Link from "next/link";

export default function TopBar() {
  return (
    <div className="flex justify-end py-4 px-8 border-b sticky top-0 z-10 backdrop-blur-sm mb-4">
      <Link
        href="/login"
        className="rounded-[8px] border px-2 py-1 border-blue-500 text-blue-500 text-sm"
      >
        登陆使用
      </Link>
    </div>
  );
}
