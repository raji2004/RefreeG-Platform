import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase/config"; // Adjust the import as needed
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const page = Number(searchParams.get("page")) || 1; // Pagination
  const pageSize = 10; // Number of records per page
  const offset = (page - 1) * pageSize;

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const donationsRef = collection(db, "donations");
    const donationsQuery = query(
      donationsRef,
      where("userId", "==", userId),
      orderBy("date", "desc"),
      limit(pageSize)
    );

    const donationDocs = await getDocs(donationsQuery);
    const donations = donationDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ donations, page });
  } catch (error) {
    console.error("Error fetching donation history:", error);
    return NextResponse.json(
      { message: "Error fetching donation history" },
      { status: 500 }
    );
  }
}
