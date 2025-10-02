import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Incident report API called")
    const supabase = await createClient()
    const body = await request.json()

    // Validate required fields
    const {
      reporter_name,
      contact_number,
      barangay,
      specific_location,
      incident_type,
      incident_description,
      urgency_level = "HIGH",
    } = body

    if (!reporter_name || !contact_number || !incident_type || !incident_description) {
      console.log("[v0] Missing required fields for incident report:", {
        reporter_name: !!reporter_name,
        contact_number: !!contact_number,
        incident_type: !!incident_type,
        incident_description: !!incident_description,
      })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("[v0] Attempting to insert incident report into database")
    // Insert incident report into database
    const { data, error } = await supabase
      .from("incident_reports")
      .insert({
        reporter_name,
        contact_number,
        barangay,
        specific_location,
        incident_type,
        incident_description,
        urgency_level,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to submit incident report", details: error.message }, { status: 500 })
    }

    console.log("[v0] Incident report inserted successfully:", data.id)
    return NextResponse.json(
      {
        message: "Incident report submitted successfully",
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
