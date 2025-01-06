import { logout } from "@/app/action";
import { Button } from "@/components/ui/button";
export default async function SignOutServer() {
  return (
    <form
      action={async () => {
        await logout();
      }}
    >
      <Button type="submit" className="w-full" disabled={false}>
        {"注销"}
      </Button>
    </form>
  );
}
