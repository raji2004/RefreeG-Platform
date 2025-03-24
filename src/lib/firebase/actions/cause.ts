"use server";
import { Cause } from "@/lib/type";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config";
import { checkIfBookmarked } from ".";

export const addCause = async (
  causeData: Omit<Cause, "id">
): Promise<string> => {
  try {
    // Save to the global "causes" collection
    const causesRef = collection(db, "causes");
    const globalDocRef = await addDoc(causesRef, causeData);
    console.log("Cause added with ID:", globalDocRef.id);
    return globalDocRef.id;
  } catch (error) {
    console.error("Error adding cause:", error);
    throw error;
  }
};
export const getCauseById = async (causeId: string): Promise<Cause | null> => {
  try {
    const causeRef = doc(db, "causes", causeId);
    const docSnap = await getDoc(causeRef);
    // console.log(causeId)
    if (!docSnap.exists()) {
      // console.log("Cause not found with ID:", causeId);
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as Cause;
  } catch (error) {
    console.error("Error fetching cause by ID:", error);
    throw error;
  }
};
export const getCausesByUserId = async (userId: string): Promise<Cause[]> => {
  try {
    const causesRef = collection(db, "causes");
    const q = query(causesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const causes: Cause[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Cause[];

    return causes;
  } catch (error) {
    console.error("Error fetching causes by user ID:", error);
    throw error;
  }
};

// // lib/firebase/actions.ts
// export const getCausesCountByUserId = async (
//   userId: string
// ): Promise<number> => {
//   try {
//     const causes = await getCausesByUserId(userId);
//     return causes.length;
//   } catch (error) {
//     console.error("Error getting causes count:", error);
//     return 0; // Return 0 if there's an error
//   }
// };

export const getCauses = async (): Promise<Cause[]> => {
  try {
    const causesRef = collection(db, "causes");
    const querySnapshot = await getDocs(causesRef);

    const causes = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();

        // Call async function to check if it's bookmarked
        const isBookmarked = await checkIfBookmarked(doc.id);

        return { id: doc.id, ...data, isBookmarked } as Cause;
      })
    );

    return causes.filter((cause) => cause !== null) as Cause[];
  } catch (error) {
    console.error("Error fetching causes:", error);
    throw error;
  }
};
