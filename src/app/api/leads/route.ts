import { NextResponse } from "next/server";

export interface LeadSubmissionPayload {
  fullName: string;
  phone: string;
  city: string;
  plotArea?: string;
  service?: string;
  notes?: string;
  source?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadSubmissionPayload>;

    const { fullName, phone, city, plotArea, service, notes, source } = body;

    // Basic validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    // In production, integrate with CRM / Database / WhatsApp notification webhook
    console.log("[Livitech Design Lead Received]", {
      timestamp: new Date().toISOString(),
      fullName: fullName.trim(),
      phone: cleanPhone,
      city: city || "Patna",
      plotArea: plotArea || "Not specified",
      service: service || "Architecture & Design",
      notes: notes?.trim() || "",
      source: source || "service-detail-page",
    });

    return NextResponse.json(
      {
        success: true,
        message: `Dhanyawad ${fullName.trim()}! Aapki request Livitech Design (livitechdesign.in) par darj ho gayi hai. Hamare Patna Studio architect aapse 2 ghante ke andar contact karenge.`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Livitech Design Lead Error]", error);
    return NextResponse.json(
      { error: "Submission failed. Please call our Patna helpline directly." },
      { status: 500 }
    );
  }
}
