'use server'
import { db } from "@/lib/firebase/config";
import { doc, deleteDoc, collection, getDocs, query, setDoc, getDoc, addDoc } from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";

/**
 * Removes a bookmark from the database.
 * @param causeId - The ID of the cause to remove from bookmarks.
 */
export const removeBookmark = async (causeId: string) => {
  const userId = await getSessionId();
  

  if (!userId) {
    console.error("User ID not found. Cannot remove bookmark.");
    return;
  }

  try {
    const bookmarkRef = doc(db, `users/${userId}/bookmarked`, causeId);
    await deleteDoc(bookmarkRef);
    console.log("Bookmark removed successfully.");
    window.dispatchEvent(new Event("storage")); // Notify other components
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
};


/**
 * getting a bookmark from the database.
 * @param userId - The ID of the cause to remove from bookmarks.
 */
export const getBookmarkedIds = async (userId: string):Promise<string[]> => {
  if (!userId ||userId === 'undefined') {
    return [];
  }
  try {
    
    const bookmarksQuery = query(collection(db, `users/${userId}/bookmarked`));
      const querySnapshot = await getDocs(bookmarksQuery);
      const bookmarkedCauseIds = querySnapshot.docs.map((doc) => doc.data().causeId); // Extract only the cause IDs
      return bookmarkedCauseIds;
  } catch (error) {
    return [];
  }
}

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
}
