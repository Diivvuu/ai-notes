import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RedirectStatusCode } from "next/dist/client/components/redirect-status-code";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    // redirect("/api/auth/login");
    return NextResponse.redirect(
      new URL(`/api/auth/login?post_login_redirect_url=/dashboard`, request.url)
    );
  }
}
export const config = {
  matcher: ["/dashboard"],
};
