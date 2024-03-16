import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseReqResClient } from "@/utils/supabaseServerClient";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createSupabaseReqResClient(request, response);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user && request.nextUrl.pathname.startsWith("/platform")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/account/:path*"],
};
