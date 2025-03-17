"use client";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase/config";

export const uploadImage = async (file: File,path:string): Promise<string> => {
  if (!file) throw new Error("No file provided.");

  const fileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `${path}/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null, // No progress tracking
      (error) => reject(new Error("Upload failed. Please try again.")),
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL); // ✅ Return only the URL
        } catch (error) {
          reject(new Error("Failed to retrieve file URL."));
        }
      }
    );
  });
};
