import React from "react";
import { FiArrowUpRight, FiHeart, FiStar } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function DonationList() {
  return (
    <div className="p-6 rounded-lg border border-gray-200 shadow-sm bg-white mt-6">
      {/* Header with icon and title */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <Image
            src="/DonationDetail/Graph.svg"
            width={24}
            height={24}
            alt="Graph"
          />
        </div>
        <h3
          className="text-xl font-semibold bg-gradient-to-r from-[#EF4387] to-[#0066CC] bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(227deg, #EF4387 21.93%, #06C 95.78%)",
          }}
        >
          300 people just donated
        </h3>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 mb-4"></div>

      {/* Donation list */}
      <ul className="space-y-4">
        {/* Donation item 1 */}
        <li className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <FiHeart className="text-gray-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">Salim Ibrahim</p>
                <Badge className="text-xs text-[#7D568A] bg-[#F2EAF4] px-2 py-0.5 rounded">
                  Recent transaction
                </Badge>
              </div>
              <p className="text-sm text-gray-700">₦50,000</p>
            </div>
          </div>
          <div className="border border-[#E6EEF8] p-2 rounded-full">
            <Image
              src="/DonationDetail/Applause.svg"
              width={24}
              height={24}
              alt="Applause"
            />
          </div>
        </li>

        {/* Donation item 2 */}
        <li className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <FiHeart className="text-gray-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">Hephzibah</p>
                <Badge className="text-xs text-[#7D568A] bg-[#F2EAF4] px-2 py-0.5 rounded">
                  Recent transaction
                </Badge>
              </div>
              <p className="text-sm text-gray-700">₦10,000</p>
            </div>
          </div>
          <div className="border border-[#E6EEF8] p-2 rounded-full">
            <Image
              src="/DonationDetail/Applause.svg"
              width={24}
              height={24}
              alt="Applause"
            />
          </div>
        </li>
        {/* Donation item 3 */}
        <li className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <FiHeart className="text-gray-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">Julius</p>
                <Badge className="text-xs text-[#7D568A] bg-[#F2EAF4] px-2 py-0.5 rounded">
                  Recent transaction
                </Badge>
              </div>
              <p className="text-sm text-gray-700">₦50,000</p>
            </div>
          </div>
          <div className="border border-[#E6EEF8] p-2 rounded-full">
            <Image
              src="/DonationDetail/Applause.svg"
              width={24}
              height={24}
              alt="Applause"
            />
          </div>
        </li>
      </ul>

      {/* Action buttons */}
      <div className="flex gap-3 mt-6 justify-center">
        <Button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50">
          See all{" "}
          <Image
            src="/DonationDetail/Eye.svg"
            width={24}
            height={24}
            alt="Eye"
            className="ml-1"
          />
        </Button>
        <Button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50">
          See top <FiStar width={24} height={24} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}

export default DonationList;
