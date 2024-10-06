import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { logActivity } from "@/utils/logger"; // Import your logging utility

// Fetch all users
export async function GET() {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Unable to fetch users:", error);
    return NextResponse.error(); // Handle error
  }
}

// Update user role
export async function POST(req: Request) {
  const { userId, role } = await req.json();

  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role });

    // Log the role update activity
    await logActivity("Updated user role", { userId, role }, "adminId"); // Replace "adminId" with actual admin ID retrieval logic

    return NextResponse.json({ message: "User role updated successfully." });
  } catch (error) {
    console.error("Unable to update user role:", error);
    return NextResponse.error(); // Handle error
  }
}

// Block or unblock user account
export async function PATCH(req: Request) {
  const { userId, isBlocked } = await req.json();

  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { isBlocked });

    // Log the blocking/unblocking activity
    await logActivity(
      isBlocked ? "Blocked user" : "Unblocked user",
      { userId, isBlocked },
      "adminId" // Replace "adminId" with actual admin ID retrieval logic
    );

    return NextResponse.json({
      message: isBlocked ? "User blocked." : "User unblocked.",
    });
  } catch (error) {
    console.error("Unable to update user status:", error);
    return NextResponse.error(); // Use without arguments
  }
}
