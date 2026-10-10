import { withAuth } from "next-auth/middleware";

/*
 * Semua /admin kecuali /admin/login wajib memiliki sesi.
 * Dicek di server (proxy), bukan sekadar sembunyi menu.
 * (Next 16: konvensi `proxy.ts` pengganti `middleware.ts`.)
 */
export default withAuth({
  pages: { signIn: "/admin/login" },
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname === "/admin/login") return true;
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
