import { db } from "@/lib/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// Handle POST request (save form data)
export async function POST(req) {
  try {
    const data = await req.json();
    const docRef = await addDoc(collection(db, "formResponses"), data);
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// Handle GET request (retrieve form data)
export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "formResponses"));
    const responses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(responses);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
