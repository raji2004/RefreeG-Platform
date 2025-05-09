import { db } from "./config";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

// Fetch total users
export async function getUsers() {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    return usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Unable to fetch users");
  }
}

export async function fetchCausesByCategory(category: string) {
  try {
    const causesRef = collection(db, "causes");
    const q = query(causesRef, where("causeCategory", "==", category));
    const querySnapshot = await getDocs(q);
    const causes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return causes;
  } catch (error) {
    console.error("Error fetching causes by category:", error);
    throw error;
  }
}


// Fetch active causes
// export async function getCauses(statusQuery: string) {
//   try {
//     const causesCollection = collection(db, "causes");
//     const causesQuery = query(
//       causesCollection,
//       where("status", "==", statusQuery)
//     );
//     const causesSnapshot = await getDocs(causesQuery);
//     return causesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error("Error fetching causes:", error);
//     throw new Error("Unable to fetch causes");
//   }
// }


// Fetch donations
export async function getDonations() {
  try {
    const donationsCollection = collection(db, "donations");
    const donationsSnapshot = await getDocs(donationsCollection);
    const donations = donationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      amount: doc.data().amount,
      donorId: doc.data().donorId || "", // Ensure donorId is included
      // You can assert the type if necessary
      ...(doc.data() as { donorId?: string }), // Allow optional donorId
    }));
    
    console.log("Fetched donations:", donations);
    return donations;
  } catch (error) {
    console.error("Error fetching donations:", error);
    return null; // Return null instead of throwing an error
  }
}
