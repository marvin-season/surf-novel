import { signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { ComponentPropsWithRef } from "react";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}

export function SignOut(props: ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
