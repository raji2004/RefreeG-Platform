import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

interface Donation {
  id: string;
  [key: string]: any;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 10;

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
    const donations: Donation[] = donationDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      data: {
        donations,
        page,
        pageSize,
        total: donations.length, // Consider adding total count if needed
      },
    });
  } catch (error: any) {
    console.error("Error fetching donation history:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching donation history",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
