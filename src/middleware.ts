// Import NextRequest to get type safety for the request object
import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create the i18n middleware instance
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  response.headers.set("x-next-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: [
    // Your existing matcher config remains the same
    "/",
    "/(pt-PT|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
