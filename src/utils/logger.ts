// logger.ts
import { db } from "../lib/firebase/config"; // Adjust the import as necessary
import { collection, addDoc } from "firebase/firestore";

export async function logActivity(activity: string, details: any, adminId: string) {
  try {
    const logEntry = {
      activity,
      details,
      timestamp: new Date(),
      adminId,
      // Optionally add more fields like IP address
    };

    await addDoc(collection(db, "auditLogs"), logEntry);
    console.log("Activity logged successfully");
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}
