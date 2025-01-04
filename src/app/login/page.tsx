import UserButton from "@/components/auth/user-button";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-6 p-6">
        <UserButton />
      </div>
    </div>
  );
}
