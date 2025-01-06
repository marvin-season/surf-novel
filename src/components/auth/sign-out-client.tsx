"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default async function SignOutClient() {
  return (
    <Button
      onClick={async () => {
        await signOut({ redirectTo: "/login" });
      }}
      className="w-full"
      disabled={false}
    >
      {"注销"}
    </Button>
  );
}
