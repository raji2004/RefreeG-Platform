import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { country, state, zipCode } = await req.json();

    if (!country || !state || !zipCode) {
      return NextResponse.json({ valid: false, error: "Missing parameters" }, { status: 400 });
    }

    if (country.toLowerCase() === "usa") {
      // Use the Zippopotam API for US ZIP code validation
      const response = await fetch(`http://api.zippopotam.us/us/${zipCode}`);
      if (response.status !== 200) {
        return NextResponse.json({ valid: false, error: "Invalid ZIP code for USA" }, { status: 400 });
      }
      const data = await response.json();
      // Check if any returned place has a matching state name (case insensitive)
      const isMatch = data.places.some((place: any) =>
        place.state.toLowerCase() === state.toLowerCase()
      );
      return NextResponse.json({ valid: isMatch, error: isMatch ? undefined : "ZIP code does not match state" });
    }

    if (country.toLowerCase() === "nigeria") {
      // Nigerian postal codes: exactly 6 digits
      const regex = /^\d{6}$/;
      if (regex.test(zipCode)) {
        return NextResponse.json({ valid: true });
      } else {
        return NextResponse.json({ valid: false, error: "Invalid Nigerian postal code format" }, { status: 400 });
      }
    }

    // Fallback: for other countries, assume valid if non-empty
    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Error in validateZip API:", error);
    return NextResponse.json({ valid: false, error: "Internal server error" }, { status: 500 });
  }
}
