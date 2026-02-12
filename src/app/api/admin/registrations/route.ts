import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const serviceId = searchParams.get("serviceId") || "";
    const status = searchParams.get("status") || "";

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { playerFirstName: { contains: search } },
        { playerLastName: { contains: search } },
        { parentEmail: { contains: search } },
        { parentLastName: { contains: search } },
      ];
    }

    if (serviceId) {
      where.serviceId = serviceId;
    }

    if (status) {
      where.status = status;
    }

    const registrations = await prisma.registration.findMany({
      where,
      include: { waiver: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error("Registrations fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
