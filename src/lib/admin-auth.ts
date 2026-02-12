import { NextRequest } from "next/server";

export function verifyAdmin(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;

  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    // Token is valid if it was created within the last 24 hours
    const isExpired = Date.now() - decoded.ts > 24 * 60 * 60 * 1000;
    return !isExpired && !!decoded.email;
  } catch {
    return false;
  }
}
