import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const totalRegistrations = await prisma.registration.count();

    const registrationsByService = await prisma.registration.groupBy({
      by: ["serviceId", "serviceName"],
      _count: { id: true },
      _sum: { totalAmount: true },
    });

    const totalRevenue = await prisma.registration.aggregate({
      _sum: { totalAmount: true },
    });

    const recentRegistrations = await prisma.registration.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        playerFirstName: true,
        playerLastName: true,
        serviceName: true,
        createdAt: true,
        status: true,
        totalAmount: true,
      },
    });

    return NextResponse.json({
      totalRegistrations,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      registrationsByService: registrationsByService.map((r) => ({
        serviceId: r.serviceId,
        serviceName: r.serviceName,
        count: r._count.id,
        revenue: r._sum.totalAmount || 0,
      })),
      recentRegistrations,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
