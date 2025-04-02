"use server";
import { db } from "@/lib/firebase/config";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  setDoc,
  getDoc,
  addDoc,
  where,
} from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";

/**
 * Removes a bookmark from the database.
 * @param causeId - The ID of the cause to remove from bookmarks.
 */
export const removeBookmark = async (causeId: string) => {
  const userId = await getSessionId();

  if (!userId) {
    console.error("User ID not found. Cannot remove bookmark.");
    throw new Error("User not authenticated");
  }

  try {
    // First check if the bookmark exists
    const bookmarkQuery = query(
      collection(db, `users/${userId}/bookmarked`),
      where("causeId", "==", causeId)
    );

    const querySnapshot = await getDocs(bookmarkQuery);

    if (querySnapshot.empty) {
      console.log("Bookmark doesn't exist");
      return;
    }

    // Delete all matching documents (should be just one)
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("Bookmark removed successfully");
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
};

/**
 * getting a bookmark from the database.
 * @param userId - The ID of the cause to remove from bookmarks.
 */
export const getBookmarkedIds = async (userId: string): Promise<string[]> => {
  if (!userId || userId === "undefined") {
    return [];
  }

  try {
    const bookmarksQuery = query(collection(db, `users/${userId}/bookmarked`));
    const querySnapshot = await getDocs(bookmarksQuery);

    // Extract causeId from each document
    const bookmarkedCauseIds = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return data.causeId || doc.id; // Fallback to doc.id if causeId doesn't exist
    });

    return bookmarkedCauseIds;
  } catch (error) {
    console.error("Error getting bookmarks:", error);
    return [];
  }
};
/**
 * Adds a bookmark to the database.
 * @param causeId - The ID of the cause to add to bookmarks.
 */

export const addBookmark = async (causeId: string) => {
  const userId = await getSessionId();

  if (!userId) {
    console.error("User ID not found. Cannot add bookmark.");
    return;
  }

  try {
    const bookmarkRef = collection(db, `users/${userId}/bookmarked`);

    const q = query(bookmarkRef, where("causeId", "==", causeId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("Bookmark already exists.");
      return;
    }

    await addDoc(bookmarkRef, { causeId });
    console.log("Bookmark added successfully.");
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

export const checkIfBookmarked = async (causeId: string): Promise<boolean> => {
  const userId = getSessionId();
  if (!userId) {
    return false;
  }

  try {
    const bookmarkRef = doc(db, `users/${userId}/bookmarked`, causeId);
    const docSnap = await getDoc(bookmarkRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking if bookmarked:", error);
    return false;
  }
};
