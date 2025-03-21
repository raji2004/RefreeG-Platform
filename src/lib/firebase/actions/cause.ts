'use server'
import { Cause } from "@/lib/type";
import { collection, addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

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
        // console.log(causeId)

        if (!docSnap.exists()) {
            // console.log("Cause not found with ID:", causeId);
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

export const getCauses = async (): Promise<Cause[]> => {
    try {
        const causesRef = collection(db, "causes");
        const querySnapshot = await getDocs(causesRef);

        const causes: Cause[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Cause[];

        return causes;
    } catch (error) {
        console.error("Error fetching causes:", error);
        throw error;
    }
}



