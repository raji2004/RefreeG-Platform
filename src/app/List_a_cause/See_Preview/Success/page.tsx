"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

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

  // Load the submitted form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Define the cause URL to share.
  // Adjust the URL pattern below to point to your cause page.
  const causeUrl =
    typeof window !== "undefined" && formData
      ? `${window.location.origin}/List_a_cause/${encodeURIComponent(
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
    // For numbers 10 or below, convert to words (optional)
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
  

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-xl font-semibold">
          🎉 Congratulations! Your Cause is Live 🎉
        </div>
        <div className="text-gray-600">
          Thank you for sharing your cause with RefreeG. Your cause is now live
          on our platform, <br />
          ready to reach supporters who care about making a difference. Let&apos;s
          get the word out!
        </div>
        <Image
          src="/list_a_cause/success/success.svg"
          width={250}
          height={250}
          alt="Successful submission illustration"
          className="py-6"
        />
      </div>

      <div className="bg-[#214570] text-white px-3 pt-3 rounded-t-3xl fixed bottom-0 left-0 w-full z-50">
        <Image
          src="/list_a_cause/success/toggleBar.png"
          width={50}
          height={10}
          alt="Toggle bar"
          className="mx-auto mb-3 w-24"
        />

        <div className="flex justify-between">
          <div className="sideA w-1/2">
            <div className="flex mb-3">
              {formData && formData.uploadedImage ? (
                <Image
                  src={formData.uploadedImage.src}
                  alt={formData.uploadedImage.name}
                  width={50}
                  height={40}
                  className="w-48"
                />
              ) : (
                <Image
                  src="/list_a_cause/success/attachedImage.svg"
                  width={50}
                  height={40}
                  alt="Attached Image"
                  className="w-48"
                />
              )}
              <div className="pl-2">
                <div className="text-lg">
                  {formData ? formData.causeTitle : "Your Cause Title"}
                </div>
                <div className="text-xs">
                  Goal Amount: {formData ? formData.goalAmount : "N/A"}
                </div>
                <div className="text-xs">
                  Category: {formData ? formData.causeCategory : "N/A"}
                </div>
                <div className="text-xs">
  Deadline:{" "}
  {formData?.deadline
    ? `${formData.deadline} | ${getDaysLeft(formData.deadline)}`
    : "N/A"}
</div>

              </div>
            </div>
            <div className="mb-2 underline">What&apos;s next?</div>
            <div className="mb-2 underline">Support and FAQs</div>
            <button
              className="flex items-center space-x-2 bg-white text-black py-2 px-8 mb-8 rounded-md"
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

          <div className="sideB flex w-1/2">
            <div className="pr-2">
              <Image
                src="/list_a_cause/success/line.svg"
                alt=""
                width={1}
                height={2}
              />
            </div>
            <div>
              <div className="pb-4">
                Help your cause gain visibility! Share it on social media to
                reach more potential supporters.
              </div>
              <div className="flex pb-4">
                <div className="pr-4">
                  <a onClick={handleCopyLink} style={{ cursor: "pointer" }}>
                    <Image
                      src="/list_a_cause/success/copyLink.svg"
                      alt="Copy link"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
                <div className="pr-4">
                  <a onClick={handleFacebookShare} style={{ cursor: "pointer" }}>
                    <Image
                      src="/list_a_cause/success/facebook.svg"
                      alt="Facebook"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
                <div className="pr-4">
                  <a onClick={handleInstagramShare} style={{ cursor: "pointer" }}>
                    <Image
                      src="/list_a_cause/success/instagram.svg"
                      alt="Instagram"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
                <div className="pr-4">
                  <a onClick={handleYouTubeShare} style={{ cursor: "pointer" }}>
                    <Image
                      src="/list_a_cause/success/youtube.svg"
                      alt="YouTube"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
                <div className="pr-4">
                  <a onClick={handleTwitterShare} style={{ cursor: "pointer" }}>
                    <Image
                      src="/list_a_cause/success/x.svg"
                      alt="Twitter"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
                <div className="pr-4">
                  <a onClick={handleWhatsAppShare} style={{ cursor: "pointer" }}>
                    <Image
                      src="/list_a_cause/success/whatsapp.svg"
                      alt="WhatsApp"
                      width={30}
                      height={30}
                    />
                  </a>
                </div>
              </div>
              <button
                className="flex items-center space-x-2 bg-white text-black py-2 px-8 rounded-md"
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
    </div>
  );
}
