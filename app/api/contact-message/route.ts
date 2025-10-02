import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Contact message API called")
    const supabase = await createClient()
    const body = await request.json()

    const { subject, message, user_name, user_email } = body

    if (!subject || !message || !user_name || !user_email) {
      console.log("[v0] Missing required fields:", {
        subject: !!subject,
        message: !!message,
        user_name: !!user_name,
        user_email: !!user_email,
      })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("[v0] Attempting to insert contact message into database")
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        subject,
        message,
        user_name,
        user_email,
        status: "new",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to submit contact message", details: error.message }, { status: 500 })
    }

    console.log("[v0] Contact message inserted successfully:", data.id)
    const referenceNumber = `MSG-${new Date().getFullYear()}-${String(data.id).padStart(4, "0")}`

    return NextResponse.json(
      {
        message: "Contact message submitted successfully",
        reference_number: referenceNumber,
        id: data.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
