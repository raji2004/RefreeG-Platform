import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, doc, deleteDoc, getDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { formData, previewOnly, previewId } = await req.json();

    if (previewOnly) {
      // Save as a temporary preview
      const docRef = await addDoc(collection(db, "formPreviews"), formData);
      return NextResponse.json({ id: docRef.id, message: "Preview saved" });
    } else if (previewId) {
      // Move from previews to submissions
      const previewRef = doc(db, "formPreviews", previewId);
      const previewSnapshot = await getDoc(previewRef);

      if (!previewSnapshot.exists()) {
        return NextResponse.json({ error: "Preview not found" }, { status: 404 });
      }

      // Save the final data
      const finalDocRef = await addDoc(collection(db, "formSubmissions"), previewSnapshot.data());

      // Delete from preview collection
      await deleteDoc(previewRef);

      return NextResponse.json({ id: finalDocRef.id, message: "Form submitted successfully" });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    // Check if error is an instance of Error to safely access the message
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
