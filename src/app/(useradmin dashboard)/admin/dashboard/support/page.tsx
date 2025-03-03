"use client";

import React, { useState } from "react";
import AccordionSection from "@/components/AccordionSection";

const Support: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const sections = [
    {
      title: "Getting Started",
      id: "gettingStarted",
      items: [
        {
          id: "createAccount",
          label: "How to create an account",
          content:
            "To create an account, click on Sign Up and follow the instructions.",
        },
        {
          id: "setupProfile",
          label: "Setting up your profile",
          content: "Go to your profile settings and fill out your details.",
        },
        {
          id: "mission",
          label: "Understanding RefreeG’s mission",
          content:
            "RefreeG aims to provide transparent crowdfunding for education.",
        },
      ],
    },
    {
      title: "Donations & Fundraising",
      id: "donationsFundraising",
      items: [
        {
          id: "makingDonation",
          label: "How to donate",
          content: "Choose a campaign and use Paystack or crypto to donate.",
        },
        {
          id: "paymentMethods",
          label: "How to list a cause",
          content:
            "Go to 'Start a Cause,' fill in details, upload documents, and submit for review.",
        },
        {
          id: "withdrawFunds",
          label: "Withdrawal process & timelines",
          content:
            "Naira donations are instant, while crypto transfers depend on network confirmation.",
        },
      ],
    },
    {
      title: "Account & Security",
      id: "accountSecurity",
      items: [
        {
          id: "resetPassword",
          label: "How to reset your password",
          content:
            "Click Forgot Password?, enter your email, check your inbox for the reset link, set a new password, and log in.",
        },
        {
          id: "twofactorAuthentication",
          label: "Two-factor authentication (2FA) setup",
          content:
            "Enable 2FA in account settings to add an extra layer of security using email.",
        },
        {
          id: "scamPrevention",
          label: "Avoiding scams on RefreeG",
          content:
            "Only donate to vetted campaigns and report suspicious activity.",
        },
      ],
    },
    {
      title: "Policy & Compliance",
      id: "policyCompliance",
      items: [
        {
          id: "termsService",
          label: "Terms of service & prohibited content",
          content:
            "Review our terms to understand usage rules and prohibited content to ensure compliance.",
        },
        {
          id: "causeVerification",
          label: "Cause verification guidelines",
          content:
            "All causes go through a verification process to ensure authenticity before approval.",
        },
        {
          id: "refundPolicies",
          label: "Refund policies",
          content: "Donations are final.",
        },
      ],
    },
    {
      title: "Contact Support",
      id: "contactSupport",
      items: [
        {
          id: "liveChat",
          label: "Live chat & email support",
          content:
            "Get real-time assistance through live chat or reach us via email for support.",
        },
        {
          id: "reportProblem",
          label: "Report a problem",
          content:
            "Encounter an issue? Let us know, and we'll work to resolve it as soon as possible.",
        },
        {
          id: "communitySupport",
          label: "Community support forum",
          content:
            "Join discussions, ask questions, and get help from other users in our forum.",
        },
      ],
    },
  ];

  return (
    <div className="p-8 ">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Support & Help Center
      </h1>
      <div className="space-y-6">
        {sections.map((section) => (
          <AccordionSection
            key={section.id}
            title={section.title}
            id={section.id}
            items={section.items}
            openItems={openItems}
            toggleItem={toggleItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Support;
