import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase/config"; // Import your Firebase setup

export const handleSubmit = async (formData, toast) => {
  const email = formData.get("email");

  console.log(email);

  if (!email) {
    toast({
      title: "Invalid Email",
      description: "Please enter a valid email address.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    return;
  }

  try {
    // Check if the email already exists in the 'newsletter' collection
    const emailQuery = query(
      collection(db, "newsletter"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      // If email already exists, show a warning toast
      toast({
        title: "Already Subscribed",
        description: "This email is already subscribed to the newsletter.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    // If email doesn't exist, add to the collection
    // The Cloud Function will automatically trigger when a new document is added
    const docRef = await addDoc(collection(db, "newsletter"), {
      email,
      subscribedAt: new Date(),
    });

    console.log("Submitted email:", docRef.id);

    // Show success toast
    toast({
      title: "Subscribed",
      description: "You have been successfully added to the newsletter!",
      duration: 5000,
      isClosable: true,
      position: "top",
      style: {
        backgroundColor: "#00264c",
        color: "white",
      },
    });
  } catch (error) {
    console.error("Error submitting email:", error);

    toast({
      title: "Error",
      description: "There was an issue subscribing. Please try again later.",
      duration: 5000,
      isClosable: true,
      position: "top",
      style: {
        backgroundColor: "#00264c",
        color: "white",
      },
    });
  }
};
