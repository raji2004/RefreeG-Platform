"use client";

import React, { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TabType = "Comments" | "FAQ" | "Community" | "Updates";

interface CauseTabsProps {
  commentCount?: number;
}

const CauseTabs: React.FC<CauseTabsProps> = ({ commentCount = 20 }) => {
  const [activeTab, setActiveTab] = useState<TabType>("Comments");

  const tabs: TabType[] = ["Comments", "FAQ", "Community", "Updates"];

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

            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-lg font-medium mb-6">
                They are no comments on this cause yet, be the first to comment?
              </p>
              <button className="border border-gray-300 text-gray-800 px-8 py-3 rounded-md flex items-center font-semibold">
                Donate <BsChevronRight className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {activeTab === "FAQ" && (
          <div className="py-8">
            <p className="text-gray-600">
              Frequently asked questions will appear here.
            </p>
          </div>
        )}

        {activeTab === "Community" && (
          <div className="py-8">
            <p className="text-gray-600">
              Community discussions will appear here.
            </p>
          </div>
        )}

        {activeTab === "Updates" && (
          <div className="py-8">
            <p className="text-gray-600">Project updates will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CauseTabs;
