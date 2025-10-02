import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Volunteer application API called")
    const supabase = await createClient()
    const body = await request.json()

    const { full_name, email, phone, age, address, skills, availability, motivation } = body

    if (!full_name || !email || !phone || !age || !address || !skills || !availability || !motivation) {
      console.log("[v0] Missing required fields for volunteer application:", {
        full_name: !!full_name,
        email: !!email,
        phone: !!phone,
        age: !!age,
        address: !!address,
        skills: !!skills,
        availability: !!availability,
        motivation: !!motivation,
      })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("[v0] Attempting to insert volunteer application into database")
    const { data, error } = await supabase
      .from("volunteer_applications")
      .insert({
        full_name,
        email,
        phone,
        age: Number.parseInt(age),
        address,
        skills,
        availability,
        motivation,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json(
        { error: "Failed to submit volunteer application", details: error.message },
        { status: 500 },
      )
    }

    console.log("[v0] Volunteer application inserted successfully:", data.id)
    const referenceNumber = `VOL-${new Date().getFullYear()}-${String(data.id).padStart(4, "0")}`

    return NextResponse.json(
      {
        message: "Volunteer application submitted successfully",
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
