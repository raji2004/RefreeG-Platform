"use client";

import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TabType = "Comments" | "FAQ" | "Community" | "Updates";

interface Comment {
  id: string;
  userName: string;
  userImage: string;
  donationAmount: string | null;
  timeAgo: string;
  message: string;
}

interface CauseTabsProps {
  commentCount?: number;
}

const CauseTabs: React.FC<CauseTabsProps> = ({ commentCount = 20 }) => {
  const [activeTab, setActiveTab] = useState<TabType>("Comments");

  const tabs: TabType[] = ["Comments", "FAQ", "Community", "Updates"];

  // Sample comments data
  const comments: Comment[] = [
    {
      id: "1",
      userName: "Salim Ibrahim",
      userImage: "/DonationDetail/avatar.png",
      donationAmount: "₦10,000",
      timeAgo: "2 hours ago",
      message:
        "We are heartbroken to hear about the destruction and devastation brought on by Hurricane Helene but we are honored to hear we are your favorite. Sending you love, support, and mezcal as you rebuild your incredible space. May we all sip mezcal together soon.",
    },
    {
      id: "2",
      userName: "Salim Ibrahim",
      userImage: "/DonationDetail/avatar.png",
      donationAmount: "₦0",
      timeAgo: "2 hours ago",
      message:
        "We are heartbroken to hear about the destruction and devastation brought on by Hurricane Helene but we are honored to hear we are your favorite. Sending you love, support, and mezcal as you rebuild your incredible space. May we all sip mezcal together soon.",
    },
    {
      id: "3",
      userName: "Salim Ibrahim",
      userImage: "/DonationDetail/avatar.png",
      donationAmount: "₦10,000",
      timeAgo: "2 hours ago",
      message:
        "We are heartbroken to hear about the destruction and devastation brought on by Hurricane Helene but we are honored to hear we are your favorite. Sending you love, support, and mezcal as you rebuild your incredible space. May we all sip mezcal together soon.",
    },
  ];

  // FAQ data
  const faqItems = [
    {
      question: "How does Refreeg ensure transparency in donations?",
      answer:
        "Refreeg ensures transparency by recording all donations on the blockchain, providing real-time tracking of funds, and sharing regular updates on how donations are being used for each cause.",
    },
    {
      question: "What types of causes can I donate to?",
      answer:
        "You can donate to a variety of causes including education, healthcare, disaster relief, community development, and humanitarian aid projects across Africa.",
    },
    {
      question: "How can I track the progress of my donation?",
      answer:
        "You can track your donation's progress through your account dashboard, where you'll see real-time updates on fund allocation, project milestones, and impact reports.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, your payment information is fully secure. We use industry-standard encryption and security protocols to protect all personal and financial data.",
    },
    {
      question: "Can I donate anonymously?",
      answer:
        "Yes, we offer an option to donate anonymously. Your personal information will not be displayed publicly, but we still maintain records for transparency and compliance purposes.",
    },
    {
      question: "What happens if a cause doesn't reach its fundraising goal?",
      answer:
        "If a cause doesn't reach its fundraising goal by the deadline, the funds are still directed to the cause, but the project scope may be adjusted accordingly. We ensure all donations are used effectively.",
    },
    {
      question: "How do I know if a cause is legitimate?",
      answer:
        "All causes on Refreeg undergo a thorough verification process. We check the legitimacy of the organization, their track record, and ensure they meet our transparency standards before listing them.",
    },
    {
      question: "Can I create my own cause on Refreeg?",
      answer:
        "Yes, you can submit a cause for consideration. Our team will review your proposal based on our guidelines and verification process before it can be listed on the platform.",
    },
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full px-4 mt-12 mb-16">
      {/* Tab navigation */}
      <div className="border-b border-t pt-4 border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "py-4 px-6 font-medium text-sm relative",
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab === "Comments" ? `${tab} ${commentCount}` : tab}
            </button>
          ))}
          <div className="ml-auto flex items-center">
            <button className="bg-[#0095FF] text-white text-md px-6 py-2 rounded-md flex items-center">
              Donate <BsChevronRight className="ml-2" />
            </button>
            <button className="ml-4 text-md text-gray-600 flex items-center">
              <Image
                src="/DonationDetail/remind.svg"
                width={24}
                height={24}
                alt="remind"
                className="mr-2"
              />
              Remind me
            </button>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "Comments" && (
          <div>
            <p className="text-sm text-gray-500 mb-8">
              Please drop supportive comments even if you don&apos;t want to
              donate :)
            </p>

            {comments.length > 0 ? (
              <div className="space-y-8">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-100 pb-8"
                  >
                    <div className="flex items-start">
                      <div className="mr-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={comment.userImage}
                            alt={comment.userName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <h4 className="font-semibold text-gray-900">
                            {comment.userName}
                          </h4>

                          <p className="text-gray-700">{comment.message}</p>
                        </div>

                        <div className="flex items-center  space-x-2 mt-2">
                          {comment.donationAmount && (
                            <Badge className="flex items-center text-sm bg-white border border-[#2B2829] font-light">
                              <Image
                                src="/DonationDetail/Hand Holding Heart.svg"
                                width={16}
                                height={16}
                                alt="HandHoldingHeart"
                                className="mr-1"
                              />
                              <span className="text-sm text-[#2B2829]">
                                {comment.donationAmount}
                              </span>
                            </Badge>
                          )}
                          {comment.timeAgo && (
                            <Badge className="flex items-center text-sm bg-white border border-[#2B2829] font-light">
                              <Image
                                src="/DonationDetail/clock.svg"
                                width={16}
                                height={16}
                                alt="Clock"
                                className="mr-1"
                              />
                              <span className="text-sm text-[#2B2829] font-light">
                                {comment.timeAgo}
                              </span>
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-lg font-medium mb-6">
                  They are no comments on this cause yet, be the first to
                  comment?
                </p>
                <button className="border border-gray-300 text-gray-800 px-8 py-3 rounded-md flex items-center font-semibold">
                  Donate <BsChevronRight className="ml-2" />
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "FAQ" && (
          <div className="py-8">
            <Accordion
              type="single"
              collapsible
              className="w-[50%] mx-auto space-y-4"
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  className="border border-[#5A5555] rounded-md overflow-hidden shadow-sm py-4 hover:bg-gray-100 hover:border-none transition-all duration-300"
                  key={index}
                  value={`item-${index}`}
                >
                  <AccordionTrigger className="hover:no-underline text-left font-medium text-gray-800 px-4 py-3">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 px-4 py-3">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="w-[50%] p-6 mt-8">
              <p>
                Do you have a question we didn&apos;t answer? Send us an email
                and we&apos;ll get right back with an answer!
              </p>

              <p>
                <Link
                  className="text-blue-500 hover:underline"
                  href={"/contact"}
                >
                  Create an account
                </Link>{" "}
                or{" "}
                <Link className="text-blue-500 hover:underline" href={"/login"}>
                  login
                </Link>{" "}
                to ask a question(s).
              </p>
            </div>
          </div>
        )}

        {activeTab === "Community" && (
          <div className="py-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Join the Refreeg Community: Grow, Give, and Make a Difference
              Together
            </h2>
            <p className="text-gray-600 mb-8">
              At Refreeg, we believe that true change happens when communities
              come together with a shared purpose. By joining our community, you
              become part of a dynamic and passionate group of individuals who
              are committed to empowering underprivileged communities across
              Africa.
            </p>

            <div className="flex justify-center mb-10">
              <button className="bg-white text-black border border-black px-6 py-3 rounded-md flex items-center font-medium hover:bg-black hover:text-white transition-colors">
                Join community <BsChevronRight className="ml-2" />
              </button>
            </div>

            <Accordion type="single" collapsible className="max-w-lg mx-auto">
              <AccordionItem
                className="border border-[#5A5555] rounded-md overflow-hidden shadow-sm py-4 hover:bg-gray-100 hover:border-none transition-all duration-300"
                value="why-join-us"
              >
                <AccordionTrigger className="hover:no-underline text-left font-medium text-gray-800 px-4 py-3">
                  Why Join Us?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 py-3">
                  <ul className="list-disc pl-5 space-y-2 text-left">
                    <li>
                      Connect with like-minded individuals passionate about
                      making a difference
                    </li>
                    <li>
                      Access exclusive events, webinars, and volunteer
                      opportunities
                    </li>
                    <li>
                      Participate in community discussions and share your ideas
                    </li>
                    <li>
                      Stay updated on the latest projects and success stories
                    </li>
                    <li>
                      Contribute your skills and expertise to meaningful causes
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {activeTab === "Updates" && (
          <div className="py-8 max-w-3xl mx-auto">
            {/* Empty state message */}
            <div className="text-center mb-8">
              <p className="text-red-500 font-medium">There are no updates on this cause yet!</p>
            </div>
            
            {/* Updates accordion */}
            <Accordion type="single" collapsible className="w-full border border-gray-200 rounded-md overflow-hidden">
              <AccordionItem
                value="update-1"
                className="border-none"
              >
                <AccordionTrigger className="hover:no-underline text-left font-medium text-gray-800 px-6 py-4 flex justify-between">
                  <div className="flex-1">Latest Updates: Stay Connected to the Impact</div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-6 py-4">
                  <div className="space-y-4">
                    <p>
                      This cause has not posted any updates yet. Check back soon for progress reports, 
                      milestones achieved, and stories from the communities being helped.
                    </p>
                    <p>
                      When updates are available, they will appear here with details about how your 
                      donations are making a difference.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default CauseTabs;
