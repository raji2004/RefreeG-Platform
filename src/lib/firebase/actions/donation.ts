"use server";

import { db } from "@/lib/firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";

interface Donation {
  id: string;
  amount: number;
  date: Date;
  cause: string;
}

interface PaginatedDonations {
  donations: Donation[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export async function getUserDonations(options?: {
  userId?: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  success: boolean;
  data?: PaginatedDonations;
  message?: string;
  error?: any;
}> {
  try {
    const userId = options?.userId || (await getSessionId());
    const page = options?.page || 1;
    const pageSize = options?.pageSize || 10;

    if (!userId) {
      throw new Error("User ID is required");
    }

    // 1. Get paginated donations
    const donationsRef = collection(db, "donations");
    const donationsQuery = query(
      donationsRef,
      where("userId", "==", userId),
      orderBy("date", "desc"),
      limit(pageSize)
    );

    const snapshot = await getDocs(donationsQuery);
    const donations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore Timestamp to Date if needed
      date: doc.data().date?.toDate() || null,
    })) as Donation[];

    // 2. Get total count for pagination
    const countQuery = query(donationsRef, where("userId", "==", userId));
    const countSnapshot = await getDocs(countQuery);
    const totalCount = countSnapshot.size;

    return {
      success: true,
      data: {
        donations,
        pagination: {
          currentPage: page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      },
    };
  } catch (error: any) {
    console.error("Donations fetch error:", error);
    return {
      success: false,
      message: "Failed to fetch donations",
      error: error.message,
    };
  }
}

// lib/server/donations.ts - Placeholder for donation data fetching
export const getDonationsByUserId = async (userId: string) => {
  // Implementation would connect to your Firebase backend
  console.log(`Fetching donations for user ${userId}`);

  // This would be replaced with actual Firebase calls
  return [];
};
