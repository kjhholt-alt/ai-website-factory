import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fullRegistrationSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate the registration data
    const parsed = fullRegistrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Create the registration with waiver
    const registration = await prisma.registration.create({
      data: {
        serviceId: data.serviceId,
        serviceName: body.serviceName || "",
        parentFirstName: data.parentFirstName,
        parentLastName: data.parentLastName,
        parentEmail: data.parentEmail,
        parentPhone: data.parentPhone,
        parentAddress: data.parentAddress,
        parentCity: data.parentCity,
        parentState: data.parentState,
        parentZip: data.parentZip,
        playerFirstName: data.playerFirstName,
        playerLastName: data.playerLastName,
        playerDateOfBirth: data.playerDateOfBirth,
        playerAge: data.playerAge,
        playerGender: data.playerGender,
        playerSkillLevel: data.playerSkillLevel,
        medicalConditions: data.medicalConditions || "",
        allergies: data.allergies || "",
        medications: data.medications || "",
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        emergencyRelationship: data.emergencyRelationship,
        totalAmount: body.totalAmount || 0,
        status: "confirmed",
        paymentStatus: "pending",
        waiver: {
          create: {
            signedName: data.signedName,
            agreedToTerms: Boolean(data.agreedToTerms),
            ipAddress:
              req.headers.get("x-forwarded-for") ||
              req.headers.get("x-real-ip") ||
              "unknown",
          },
        },
      },
      include: {
        waiver: true,
      },
    });

    // Send confirmation email (best-effort, don't fail registration if email fails)
    try {
      await sendConfirmationEmail(registration);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json({
      id: registration.id,
      status: registration.status,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}

async function sendConfirmationEmail(registration: {
  parentEmail: string;
  parentFirstName: string;
  playerFirstName: string;
  playerLastName: string;
  serviceName: string;
  id: string;
  totalAmount: number;
}) {
  // Only send if RESEND_API_KEY is configured
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY not configured, skipping email");
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to: registration.parentEmail,
    subject: `Registration Confirmed - ${registration.serviceName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #16a34a; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">Registration Confirmed!</h1>
        </div>
        <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 8px 8px;">
          <p>Hi ${registration.parentFirstName},</p>
          <p>Thank you for registering <strong>${registration.playerFirstName} ${registration.playerLastName}</strong> for <strong>${registration.serviceName}</strong>.</p>
          <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Registration ID:</strong> ${registration.id}</p>
            <p style="margin: 5px 0;"><strong>Program:</strong> ${registration.serviceName}</p>
            <p style="margin: 5px 0;"><strong>Amount Due:</strong> $${registration.totalAmount}</p>
          </div>
          <p>We will be in touch with additional details about the camp, including what to bring, drop-off/pick-up times, and more.</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br/>Elite Soccer Academy</p>
        </div>
      </div>
    `,
  });
}
