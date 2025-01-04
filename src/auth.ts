import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    authorized: async ({ request, auth }) => {
      const { pathname } = request.nextUrl;
      if (!auth && pathname !== "/login") {
        const newUrl = new URL("/login", request.nextUrl.origin);
        return Response.redirect(newUrl);
      }
      return true;
    },
  },
});
