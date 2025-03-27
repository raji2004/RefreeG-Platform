"use server"
import { doc, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { getCauseById, updateCauseById } from "./cause";

export const logTransaction = async ({
    userId,
    causeId,
    amount,
    customer_name,
    transactionId
}: {
    userId: string;
    causeId: string;
    amount: number;
    customer_name: string;
    transactionId: string;
}) => {
    try {
        // 
        const cause = await getCauseById(causeId)
        console.log('Current raisedAmount:', cause!.raisedAmount, typeof cause!.raisedAmount);
        console.log('New amount:', amount, typeof amount);
        const currentRaised = parseFloat(cause!.raisedAmount.toString());
        const newAmount = parseFloat(amount.toString());
        console.log('Parsed values:', currentRaised, newAmount);
        await updateCauseById(causeId, {
            ...cause,
            raisedAmount: currentRaised + newAmount
        })
        const causeDonationRef = collection(db, `causes/${causeId}/donated`);
        await addDoc(causeDonationRef, {
            userId,
            customer_name,
            amount,
            timestamp: new Date().toISOString()
        });

        // Save to user collection
        const userDonationRef = collection(db, `users/${userId}/donated`);
        await addDoc(userDonationRef, {
            causeId,
            amount,
            timestamp: new Date().toISOString()
        });

        return { success: true };
    } catch (error) {
        console.error("Error logging transaction:", error);
        throw error;
    }
}

export const getCauseTransactions = async (causeId: string) => {
    try {
        const donationsRef = collection(db, `causes/${causeId}/donated`);
        const querySnapshot = await getDocs(donationsRef);

        const transactions = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return transactions;
    } catch (error) {
        console.error("Error fetching cause transactions:", error);
        throw error;
    }
}

export const getUserTransactions = async (userId: string) => {
    try {
        const donationsRef = collection(db, `users/${userId}/donated`);
        const querySnapshot = await getDocs(donationsRef);

        const transactions = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return transactions;
    } catch (error) {
        console.error("Error fetching user transactions:", error);
        throw error;
    }
}
