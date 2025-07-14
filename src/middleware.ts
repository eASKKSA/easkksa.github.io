import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Your existing matcher config remains the same
    "/",
    "/(pt-PT|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
