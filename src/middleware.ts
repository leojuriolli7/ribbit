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
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
