"use server";
import { User } from "@/lib/type";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";

export async function addUser(
  docId: string,
  user: Omit<User, "id" | "nin" | "bvn">
): Promise<void> {
  const userRef = doc(db, "users", docId);

  try {
    await setDoc(userRef, user);
    console.log(`User added with ID: ${docId}`);
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    if (!userId) {
      console.warn("Invalid user ID provided:", userId);
      return null;
    }

    const userRef = doc(
      db,
      "users",
      decodeURIComponent(userId).replace(/"/g, "").trim()
    ); // Get reference to specific user
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      console.warn("User not found with ID:", userId);
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as User;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const updateUserById = async (
  userId: string,
  updatedData: Partial<Omit<User, "id">> // Ensure ID is not included in updates
): Promise<void> => {
  try {
    if (!userId) {
      console.warn("Invalid user ID provided:", userId);
      return;
    }

    const userRef = doc(db, "users", userId); // Reference to the user document

    await updateDoc(userRef, updatedData); // Update user fields
    console.log("User updated successfully:", userId);
  } catch (error) {
    console.error("Error updating user by ID:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    console.log(
      "All user IDs:",
      users.map((user) => user.id)
    ); // Log all IDs
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// delete a field from user
export const deleteUserFields = async (
  userId: string,
  fieldsToDelete: (string | number)[]
): Promise<void> => {
  try {
    if (!userId) throw new Error("User ID is required");

    const userRef = doc(db, "users", userId);
    const updateData: Record<string, any> = {};

    // Mark each field for deletion
    fieldsToDelete.forEach((field) => {
      updateData[field] = deleteField();
    });

    await updateDoc(userRef, updateData);
    console.log("Fields deleted successfully:", fieldsToDelete);
  } catch (error) {
    console.error("Error deleting fields:", error);
    throw error;
  }
};
