"use client";

import { logout } from "@/app/action";
import { Button } from "@/components/ui/button";

export default function SignOutClient() {
  return (
    <Button
      onClick={async () => {
        await logout();
      }}
      className="w-full"
      disabled={false}
    >
      {"注销"}
    </Button>
  );
}
