import { signIn } from "@/auth";

export default async function App() {
  return (
    <>
      <form
        className="flex flex-col gap-2 justify-center items-center"
        action={async (formData) => {
          "use server";
          console.log("form", Object.fromEntries(formData));
          await signIn("credentials", formData);
        }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
    </>
  );
}
