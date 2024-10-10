import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { logActivity } from "@/utils/logger"; // Update the import path for the logger

// Fetch all donations
export async function GET() {
  try {
    const donationsCollection = collection(db, "donations");
    const donationsSnapshot = await getDocs(donationsCollection);
    const donations = donationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Log the activity
    await logActivity(
      "Fetched all donations",
      { count: donations.length },
      "adminId"
    ); // Replace "adminId" with actual admin ID retrieval logic

    return NextResponse.json(donations);
  } catch (error) {
    console.error("Unable to fetch donations:", error);
    return NextResponse.error(); // Use without arguments
  }
}

// Fetch donations by donor ID
export async function POST(req: Request) {
  const { donorId } = await req.json();

  try {
    const donationsCollection = collection(db, "donations");
    const donationsSnapshot = await getDocs(donationsCollection);
    const donations = donationsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, donorId: data.donorId, ...data }; // Ensure donorId is included
    });

    // Filter donations by donor ID
    const filteredDonations = donations.filter(
      (donation) => donation.donorId === donorId
    );

    // Log the activity
    await logActivity(
      "Fetched donations by donor ID",
      { donorId, count: filteredDonations.length },
      "adminId"
    ); // Replace "adminId" with actual admin ID retrieval logic

    return NextResponse.json(filteredDonations);
  } catch (error) {
    console.error("Unable to fetch donations by donor ID:", error);
    return NextResponse.error(); // Use without arguments
  }
}
