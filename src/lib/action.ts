'use server'
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase/config";
import { User, Cause } from "./type";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";





export async function addUser(docId: string, user: Omit<User, 'id' | 'nin' | 'bvn'>): Promise<void> {
  const userRef = doc(db, 'users', docId);

  try {
    await setDoc(userRef, user);
    console.log(`User added with ID: ${docId}`);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}


export const checkEmailExists = async (email: string) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q)
    console.log(`Email: ${email}, Exists: ${!querySnapshot.empty}`);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false; // Handle errors gracefully
  }
};

export const handleSignOut = async () => {
  const cookieStore = cookies();
  await signOut(auth);
  cookieStore.delete('userSession')
  redirect("/login"); // Redirect to login after sign out
};

export const addCause = async (causeData: Omit<Cause, "id">): Promise<string> => {
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

    if (!docSnap.exists()) {
      console.warn("Cause not found with ID:", causeId);
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