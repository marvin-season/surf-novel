"use client";

import { logout } from "@/app/action";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export default function SignOut() {
  return (
    <Button
      variant={"link"}
      onClick={async () => {
        await logout();
      }}
      className="w-full"
      disabled={false}
    >
      <LogOutIcon size={"12"} />
    </Button>
  );
}
