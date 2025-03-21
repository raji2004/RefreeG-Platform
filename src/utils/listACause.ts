import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { getAuth } from "firebase/auth";

/**
 * Saves the cause data to both the global "causes" collection and 
 * under the specific user's document.
 *
 * @param finalData - The combined form data to be saved.
 * @returns The document ID of the newly created cause.
 * @throws If the user is not logged in.
 */
export const saveCauseToFirestore = async (finalData: any): Promise<string> => {
  const auth = getAuth();
  // (Optional) If you need to wait for auth state to be ready, add your custom logic here.
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User not logged in");
  }
  
  const userId = currentUser.uid;
  // Save to the global "causes" collection.
  const causesRef = collection(db, "causes");
  const globalDocRef = await addDoc(causesRef, finalData);
  
  // Save under the user's subcollection "users/{userId}/causes".
  const userCausesRef = collection(db, "users", userId, "causes");
  await setDoc(doc(userCausesRef, globalDocRef.id), finalData);
  
  return globalDocRef.id;
};
