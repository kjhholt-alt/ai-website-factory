import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password !== siteConfig.admin.password) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Simple token-based auth using a signed cookie
    const token = Buffer.from(
      JSON.stringify({
        email: siteConfig.admin.email,
        ts: Date.now(),
      })
    ).toString("base64");

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
