"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { getAuth } from "firebase/auth";

interface FormData {
  state: string;
  zipCode: string;
  currency: string;
  causeTitle: string;
  causeCategory: string;
  deadline: string;
  goalAmount: string;
  uploadedImage?: {
    src: string;
    name: string;
    size: number;
    progress: number;
  } | null;
  description?: string;
}

export default function SuccessPage() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const searchParams = useSearchParams();
  const docId = searchParams.get("id");

  useEffect(() => {
    if (docId) {
      const fetchData = async () => {
        try {
          const auth = getAuth();
          const currentUser = auth.currentUser;
          if (!currentUser) {
            console.error("No logged-in user found");
            return;
          }
          const userId = currentUser.uid;
          
          // Reference the document from the nested collection.
          const docRef = doc(db, "users", userId, "causes", docId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setFormData(docSnap.data() as FormData);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      };
  
      fetchData();
    }
  }, [docId]);
  

  // Define the cause URL to share.
  const causeUrl =
    typeof window !== "undefined" && formData
      ? `${window.location.origin}/create/${encodeURIComponent(
          formData.causeTitle
        )}`
      : "";

  // Share handler functions
  const handleCopyLink = () => {
    if (causeUrl) {
      navigator.clipboard
        .writeText(causeUrl)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link"));
    }
  };

  const handleFacebookShare = () => {
    if (causeUrl) {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          causeUrl
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleInstagramShare = () => {
    if (navigator.share && causeUrl) {
      navigator
        .share({
          title: formData?.causeTitle || "My Cause",
          text: "Check out my cause!",
          url: causeUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert(
        "Instagram sharing is not supported on this device. Please copy the link and share manually."
      );
    }
  };

  const handleYouTubeShare = () => {
    window.open("https://www.youtube.com/", "_blank", "noopener,noreferrer");
  };

  const handleTwitterShare = () => {
    if (causeUrl) {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          causeUrl
        )}&text=${encodeURIComponent("Check out my cause!")}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleWhatsAppShare = () => {
    if (causeUrl) {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(causeUrl)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  function getDaysLeft(deadline: string): string {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Past due";
    const words = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    const dayWord = diffDays <= 10 ? words[diffDays] : diffDays.toString();
    return `${dayWord} day${diffDays > 1 ? "s" : ""} left`;
  }

  // Track whether the bottom panel is open or collapsed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top Section: Congratulatory Message */}
      <div className="px-4 py-8 flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-2xl font-semibold">
          🎉 Congratulations! Your Cause is Live 🎉
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-lg">
          Thank you for sharing your cause with RefreeG. Your cause is now live
          on our platform, <br /> ready to reach supporters who care about
          making a difference. Let&lsquo;s get the word out!
        </p>
        <div className="py-6">
          <Image
            src="/list_a_cause/success/success.svg"
            width={250}
            height={250}
            alt="Successful submission illustration"
            className="mx-auto"
          />
        </div>
      </div>
      

      {/* Bottom Panel with "Pull-up" Effect */}
      <div
        className={`
          fixed bottom-0 left-0 w-full z-50 bg-[#214570] text-white px-4 pt-4 pb-6 rounded-t-3xl
          transition-transform duration-300
          ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-80px)]"}
        `}
      >
        {/* Toggle Handle */}
        <div className="flex justify-center">
          <Image
            src="/list_a_cause/success/toggleBar.png"
            width={50}
            height={10}
            alt="Toggle bar"
            className="mb-3 w-24 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Side A: Cause Details */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 flex-shrink-0">
                {formData && formData.uploadedImage ? (
                  <Image
                    src={formData.uploadedImage.src}
                    alt={formData.uploadedImage.name}
                    width={64}
                    height={64}
                    className="rounded object-cover"
                  />
                ) : (
                  <Image
                    src="/list_a_cause/success/attachedImage.svg"
                    width={64}
                    height={64}
                    alt="Attached Image"
                    className="rounded object-cover"
                  />
                )}
              </div>
              <div className="text-left">
                <h2 className="text-lg font-medium font-montserrat">
                  {formData ? formData.causeTitle : "Your Cause Title"}
                </h2>
                <p className="text-xs">
                  Goal Amount: {formData ? formData.goalAmount : "N/A"}
                </p>
                <p className="text-xs">
                  Category: {formData ? formData.causeCategory : "N/A"}
                </p>
                <p className="text-xs">
                  Deadline:{" "}
                  {formData?.deadline
                    ? `${formData.deadline} | ${getDaysLeft(formData.deadline)}`
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-left">
              <button className="underline text-sm block">
                What&apos;s next?
              </button>
              <button className="underline text-sm block">
                Support and FAQs
              </button>
            </div>
            <button
              className="mt-4 flex items-center justify-center space-x-2 bg-white text-black py-2 px-4 rounded-md w-full"
              aria-label="View cause page"
            >
              <span>View cause page</span>
              <Image
                src="/list_a_cause/success/chevronRight.svg"
                alt="Right arrow"
                width={15}
                height={15}
              />
            </button>
          </div>

          {/* Divider (Only on medium screens and up) */}
          <div className="hidden md:block w-px bg-white mx-4" />

          {/* Side B: Social Sharing */}
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <p className="mb-4 text-sm mt-2 font-medium font-montserrat">
              Help your cause gain visibility! Share it on social media to reach
              more potential supporters.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <button onClick={handleCopyLink} className="cursor-pointer">
                <Image
                  src="/list_a_cause/success/copyLink.svg"
                  alt="Copy link"
                  width={50}
                  height={50}
                />
              </button>
              <button onClick={handleFacebookShare} className="cursor-pointer">
                <Image
                  src="/list_a_cause/success/facebook.svg"
                  alt="Facebook"
                  width={50}
                  height={50}
                />
              </button>
              <button onClick={handleInstagramShare} className="cursor-pointer">
                <Image
                  src="/list_a_cause/success/instagram.svg"
                  alt="Instagram"
                  width={50}
                  height={50}
                />
              </button>
              <button onClick={handleYouTubeShare} className="cursor-pointer">
                <Image
                  src="/list_a_cause/success/youtube.svg"
                  alt="YouTube"
                  width={50}
                  height={50}
                />
              </button>
              <button onClick={handleTwitterShare} className="cursor-pointer">
                <Image
                  src="/list_a_cause/success/x.svg"
                  alt="Twitter"
                  width={50}
                  height={50}
                />
              </button>
              <button onClick={handleWhatsAppShare} className="cursor-pointer">
                <Image
                  src="/list_a_cause/success/whatsapp.svg"
                  alt="WhatsApp"
                  width={50}
                  height={50}
                />
              </button>
            </div>
            <button
              className="flex items-center justify-center space-x-2 bg-white text-black py-2 px-4 rounded-md w-full"
              aria-label="Go to dashboard"
            >
              <span>Go to dashboard</span>
              <Image
                src="/list_a_cause/success/chevronRight.svg"
                alt="Right arrow"
                width={15}
                height={15}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
