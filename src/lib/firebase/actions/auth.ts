"use server";

import {
  updateEmail,
  EmailAuthProvider,
  sendEmailVerification,
  reauthenticateWithCredential,
} from "firebase/auth";
import { updateUserById } from "@/lib/firebase/actions";
import { getAuth } from "firebase/auth";

export const updateEmailAndSendVerification = async (
  email: string,
  password: string
) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Reauthenticate with current password
    const credential = EmailAuthProvider.credential(
      user.email || email,
      password
    );
    await reauthenticateWithCredential(user, credential);

    console.log("User reauthenticated");

    // Update email
    await updateEmail(user, email);
    await updateUserById(user.uid, { email });
    await sendEmailVerification(user);
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};
