import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: [
    "/",
    "/posts(.*)",
    "/signin(.*)",
    "/signup(.*)",
    "/sso-callback(.*)",
  ],
  afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
