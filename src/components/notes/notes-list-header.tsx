"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
export default function () {
  const t = useTranslations("notes");
  const router = useRouter();
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-lg font-semibold">Notes Manager</h1>
        <p className="text-sm text-gray-500">Manage your ideas efficiently</p>
      </div>
      <div className="flex gap-4 w-[80%] mt-8 mb-12">
        <Input
          className="shadow p-6 placeholder:text-gray-300"
          placeholder="Searching your thinks"
        />
        {/* 新建笔记按钮 */}
        <Button
          variant={"secondary"}
          onClick={() => {
            router.push(`/notes/0`);
          }}
          className="flex-shrink-0 px-4 py-6 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all duration-100"
        >
          <Pencil size={20} />
        </Button>
      </div>
    </>
  );
}
