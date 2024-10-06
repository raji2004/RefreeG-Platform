import { NextResponse } from "next/server";
import { getUsers, getCauses, getDonations } from "../../../lib/firebase/admin";
import { logActivity } from "../../../utils/logger"; // Import the logger utility

// Admin Dashboard API
export async function GET(req: Request) {
  console.log("API called");
  
  // You can retrieve the admin ID from the request or session if applicable
  const adminId = "adminId"; // Replace with actual admin ID retrieval logic

  try {
    const totalUsers = await getUsers();
    const activeCauses = await getCauses("active");
    const totalDonations = (await getDonations()) || []; // Default to an empty array if null

    const totalDonationAmount = totalDonations.reduce(
      (sum, donation) => sum + (donation.amount || 0), // Default amount to 0 if undefined
      0
    );

    // Log the activity
    await logActivity("Fetched Admin Dashboard Data", { totalUsers: totalUsers.length, activeCauses: activeCauses.length, totalDonations: totalDonationAmount }, adminId);

    return NextResponse.json({
      totalUsers: totalUsers.length,
      activeCauses: activeCauses.length,
      totalDonations: totalDonationAmount,
    });
  } catch (error: unknown) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}
