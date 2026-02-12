import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Messages fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { subject, body, serviceId } = await req.json();

    if (!subject || !body) {
      return NextResponse.json(
        { error: "Subject and body are required" },
        { status: 400 }
      );
    }

    // Get all registered parent emails for the specified service (or all if no service specified)
    const where: Record<string, unknown> = {};
    if (serviceId) {
      where.serviceId = serviceId;
    }

    const registrations = await prisma.registration.findMany({
      where,
      select: { parentEmail: true },
      distinct: ["parentEmail"],
    });

    const emails = registrations.map((r) => r.parentEmail);

    // Save the message
    const message = await prisma.message.create({
      data: {
        subject,
        body,
        sentTo: emails.join(", "),
        sentBy: "admin",
        status: "sent",
      },
    });

    // Send emails if Resend is configured
    if (process.env.RESEND_API_KEY && emails.length > 0) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        for (const email of emails) {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: email,
            subject,
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>${subject}</h2>
              <div>${body.replace(/\n/g, "<br/>")}</div>
              <hr style="margin-top: 30px;"/>
              <p style="color: #666; font-size: 12px;">This message was sent by Elite Soccer Academy.</p>
            </div>`,
          });
        }
      } catch (emailError) {
        console.error("Failed to send emails:", emailError);
      }
    }

    return NextResponse.json({
      message,
      recipientCount: emails.length,
    });
  } catch (error) {
    console.error("Message send error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
