import { db } from "../../../lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { userId, name, email, avatar } = await req.json();

    // Validate input
    if (!userId || (!name && !email && !avatar)) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    // Prepare fields for update
    const updatedFields: Record<string, string> = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (avatar) updatedFields.avatar = avatar;

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updatedFields);

    return NextResponse.json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new NextResponse("Error updating profile", { status: 500 });
  }
}
