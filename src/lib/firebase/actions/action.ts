'use server'
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db, storage } from "../config";
import { User, Cause } from "../../type";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
  cookieStore.delete('userSession')
  redirect("/login"); // Redirect to login after sign out
};


