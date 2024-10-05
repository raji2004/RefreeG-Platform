'use server'
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase/config";
import { User } from "./type";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";




export async function addUser(docId: string, user:Omit<User,'id'|'nin'|'bvn'> ): Promise<void> { 
    const userRef = doc(db, 'users', docId);
  
    try {
        await setDoc(userRef, user);
        console.log(`User added with ID: ${docId}`);
      } catch (error) {
        console.error("Error adding user: ", error);
      }
}


export const checkEmailExists = async (email:string) => {
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