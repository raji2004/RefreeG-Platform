import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { logActivity } from "@/utils/logger"; // Update the import path for the logger

// Fetch all causes
export async function GET() {
  try {
    const causesCollection = collection(db, "causes");
    const causesSnapshot = await getDocs(causesCollection);
    const causes = causesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Log the activity
    await logActivity("Fetched all causes", { count: causes.length }, "adminId"); // Replace "adminId" with actual admin ID retrieval logic

    return NextResponse.json(causes);
  } catch (error) {
    console.error("Error fetching causes:", error);
    return NextResponse.json(
      { error: "Unable to fetch causes" },
      { status: 500 }
    );
  }
}

// Approve or modify a cause
export async function PATCH(request: Request) {
  const { id, status, title, description } = await request.json();

  try {
    const causeRef = doc(db, "causes", id);
    await updateDoc(causeRef, { status, title, description });

    // Log the activity
    await logActivity("Updated a cause", { id, status, title }, "adminId"); // Replace "adminId" with actual admin ID retrieval logic

    return NextResponse.json({ message: "Cause updated successfully." });
  } catch (error) {
    console.error("Error updating cause:", error);
    return NextResponse.json(
      { error: "Unable to update cause" },
      { status: 500 }
    );
  }
}

// Reject a cause
export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    const causeRef = doc(db, "causes", id);
    await deleteDoc(causeRef);

    // Log the activity
    await logActivity("Rejected a cause", { id }, "adminId"); // Replace "adminId" with actual admin ID retrieval logic

    return NextResponse.json({ message: "Cause rejected successfully." });
  } catch (error) {
    console.error("Error deleting cause:", error);
    return NextResponse.json(
      { error: "Unable to reject cause" },
      { status: 500 }
    );
  }
}
