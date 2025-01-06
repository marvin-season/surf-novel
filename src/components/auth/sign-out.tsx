import { signOut } from "@/auth";

import { Button } from "@/components/ui/button";
export default async function SignOut() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <Button type="submit" className="w-full" disabled={false}>
        {"注销"}
      </Button>
    </form>
  );
}
