import { NextResponse } from "next/server";

// This is your Next.js 13 route handler for POST requests to /api/states
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { country } = body;

    if (!country) {
      return NextResponse.json(
        { error: "No country provided." },
        { status: 400 }
      );
    }

    // Example: fetch states from an external API
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
    });

    const data = await response.json();

    if (data.error || !data.data?.states) {
      return NextResponse.json(
        { error: "No states found for the specified country." },
        { status: 404 }
      );
    }

    // Map the response to an array of state names
    const states = data.data.states.map((s: { name: string }) => s.name);

    return NextResponse.json({ states });
  } catch (error) {
    console.error("Error in POST /api/states:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
